// backend/backendUtils/uploadHandler.js

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary v2

// Load environment variables for Cloudinary configuration
// This assumes you have CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
// defined in your .env file.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Multer Configuration ---
// Multer is used to parse multipart/form-data (for file uploads).
// We use memoryStorage to store the file in memory as a Buffer,
// which is ideal when immediately streaming to a cloud service like Cloudinary,
// as it avoids writing to disk on your server.
const storage = multer.memoryStorage();

// Define file filter for Multer to accept only specific image types
const fileFilter = (req, file, cb) => {
  // Check if the file's MIME type is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    // Reject the file and provide an error message
    cb(new Error('Only image files (JPEG, PNG, GIF, WebP, etc.) are allowed!'), false);
  }
};

// Configure Multer instance
// 'upload' will be used as middleware in your routes (e.g., router.post('/', upload.array('images')))
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    // Limit file size to 5MB (5 * 1024 * 1024 bytes)
    fileSize: 5 * 1024 * 1024,
  },
});

// --- Cloudinary Upload Function ---
/**
 * @desc    Uploads an array of image files to Cloudinary.
 * @param   {Array<Express.Multer.File>} files - An array of file objects from Multer (req.files).
 * @returns {Promise<Array<{public_id: string, url: string}>>} - A promise that resolves to an array
 * of objects, each containing the Cloudinary public_id and secure_url for the uploaded images.
 * @throws  {Error} If any file upload fails or if validation fails.
 */
export const uploadImagesToCloudinary = async (files) => {
  if (!files || files.length === 0) {
    return []; // No files to upload
  }

  const uploadedImages = [];

  for (const file of files) {
    // --- Server-Side Validation (Redundant with Multer's fileFilter, but good for explicit check) ---
    // You can add more specific checks here if needed, beyond what Multer's fileFilter does.
    // For example, if you want to allow only JPEG and PNG:
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new Error(`Invalid file type for ${file.originalname}. Only JPEG, PNG, GIF, WebP are allowed.`);
    }
    // Check file size again, although Multer limits should catch this first
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File ${file.originalname} is too large. Max size is 5MB.`);
    }
    // --- End Server-Side Validation ---

    try {
      // Upload the file buffer to Cloudinary
      // 'product_images' is the folder in your Cloudinary account where images will be stored.
      const result = await cloudinary.uploader.upload(file.buffer.toString('base64'), {
        folder: 'product_images', // Organize your images in a specific folder
        resource_type: 'auto', // Automatically detect file type (image, video, raw)
      });

      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.error(`Error uploading image ${file.originalname} to Cloudinary:`, error);
      // Re-throw the error to be caught by the calling controller function
      throw new Error(`Failed to upload image ${file.originalname}: ${error.message}`);
    }
  }
  return uploadedImages;
};

// --- Cloudinary Deletion Function ---
/**
 * @desc    Deletes an image from Cloudinary using its public_id.
 * @param   {string} publicId - The public_id of the image to delete from Cloudinary.
 * @returns {Promise<object>} - A promise that resolves to the Cloudinary deletion result.
 * @throws  {Error} If the deletion fails.
 */
export const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) {
    throw new Error('Public ID is required for image deletion.');
  }
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      console.warn(`Cloudinary deletion not 'ok' for ${publicId}:`, result);
      // Depending on strictness, you might want to throw an error here too
      // throw new Error(`Cloudinary deletion failed for ${publicId}: ${result.result}`);
    }
    return result;
  } catch (error) {
    console.error(`Error deleting image ${publicId} from Cloudinary:`, error);
    throw new Error(`Failed to delete image ${publicId}: ${error.message}`);
  }
};
