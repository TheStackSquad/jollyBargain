// backend/backendUtils/uploadHandler.js

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Add a function to initialize Cloudinary
export const initCloudinary = () => {
    console.log('--- Initializing Cloudinary Configuration ---');
    console.log('  CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Loaded' : 'MISSING/UNDEFINED');
    console.log('  CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Loaded' : 'MISSING/UNDEFINED');
    console.log('  CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Loaded' : 'MISSING/UNDEFINED');

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log('Cloudinary config applied successfully!');
};

const storage = multer.memoryStorage();
console.log('Multer storage set to memoryStorage.');

const fileFilter = (req, file, cb) => {
    console.log(`Multer fileFilter: Processing file "${file.originalname}" (MIME: ${file.mimetype})`);
    if (file.mimetype.startsWith('image/')) {
        console.log(`Multer fileFilter: File "${file.originalname}" is an image. Accepting.`);
        cb(null, true);
    } else {
        const errorMsg = `Only image files (JPEG, PNG, GIF, WebP, etc.) are allowed! File: "${file.originalname}"`;
        console.error(`Multer fileFilter: ${errorMsg}. Rejecting.`);
        cb(new Error(errorMsg), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 3 * 1024 * 1024, // 5 MB
    },
});
console.log('Multer upload middleware configured.');


export const uploadImagesToCloudinary = async (files) => {
    console.log('uploadImagesToCloudinary: Function called.');
    console.log('uploadImagesToCloudinary: Received files array:', files);
    console.log('uploadImagesToCloudinary: Number of files:', files ? files.length : 0);

    if (!files || files.length === 0) {
        console.log('uploadImagesToCloudinary: No files provided. Returning empty array.');
        return [];
    }

    const uploadedImages = [];

    for (const file of files) {
        console.log(`uploadImagesToCloudinary: Processing file: "${file.originalname}"`);
        console.log(`uploadImagesToCloudinary: File details - mimetype: ${file.mimetype}, size: ${file.size} bytes`);

        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            const errorMsg = `Invalid file type for ${file.originalname}. Only JPEG, PNG, GIF, WebP are allowed.`;
            console.error(`uploadImagesToCloudinary: ${errorMsg}`);
            throw new Error(errorMsg);
        }
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            const errorMsg = `File ${file.originalname} is too large. Max size is 5MB.`;
            console.error(`uploadImagesToCloudinary: ${errorMsg}`);
            throw new Error(errorMsg);
        }

        try {
            const base64String = file.buffer.toString('base64');
            console.log(`uploadImagesToCloudinary: Uploading "${file.originalname}". Base64 string length: ${base64String.length}`);

            const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64String}`, {
                folder: 'product_images',
                resource_type: 'auto',
            });

            console.log(`uploadImagesToCloudinary: Successfully uploaded "${file.originalname}" to Cloudinary.`);
            console.log(`  Cloudinary Public ID: ${result.public_id}`);
            console.log(`  Cloudinary URL: ${result.secure_url}`);

            uploadedImages.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        } catch (error) {
            console.error(`uploadImagesToCloudinary: !!! CRITICAL ERROR uploading image ${file.originalname} to Cloudinary:`, error.message);
            throw new Error(`Failed to upload image ${file.originalname}: ${error.message}`);
        }
    }
    console.log('uploadImagesToCloudinary: All files processed. Returning uploadedImages array.');
    return uploadedImages;
};

export const deleteImageFromCloudinary = async (publicId) => {
    console.log(`deleteImageFromCloudinary: Function called for public ID: ${publicId}`);
    if (!publicId) {
        console.error('deleteImageFromCloudinary: Public ID is missing.');
        throw new Error('Public ID is required for image deletion.');
    }
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(`deleteImageFromCloudinary: Cloudinary deletion result for ${publicId}:`, result);
        if (result.result !== 'ok') {
            console.warn(`deleteImageFromCloudinary: Cloudinary deletion not 'ok' for ${publicId}:`, result);
        }
        return result;
    } catch (error) {
        console.error(`deleteImageFromCloudinary: Error deleting image ${publicId} from Cloudinary:`, error);
        throw new Error(`Failed to delete image ${publicId}: ${error.message}`);
    }
};