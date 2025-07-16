// frontend/src/components/adminpage/ImageUploader.js

import React, { useState } from "react";
import { Upload, AlertCircle, X } from "lucide-react";

// Image Uploader Component
function ImageUploader({ images, onImagesChange, error }) {
  // 'error' prop
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = async (files) => {
    setUploading(true);
    try {
      // Simulate Cloudinary upload - replace with actual Cloudinary integration
      const uploadPromises = Array.from(files).map(
        async (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                id: Date.now() + Math.random(), // Unique ID for key prop
                url: reader.result, // Base64 URL for preview
                public_id: `temp_${Date.now()}`, // Placeholder for Cloudinary public_id
                original_filename: file.name,
              });
            };
            reader.readAsDataURL(file);
          }),
      );

      const uploadedImages = await Promise.all(uploadPromises);
      onImagesChange([...images, ...uploadedImages]);
    } catch (uploadError) {
      // Renamed 'error' to 'uploadError' to avoid shadowing
      // console.error("Upload failed:", uploadError); // Use uploadError here
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const { files } = e.dataTransfer;
    if (files.length > 0) {
      handleImageUpload(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const removeImage = (imageId) => {
    onImagesChange(images.filter((img) => img.id !== imageId));
  };

  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [moved] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, moved);
    onImagesChange(newImages);
  };

  // Refactor the class logic outside the JSX
  let uploaderClasses =
    "border-2 border-dashed rounded-lg p-8 text-center transition-colors";
  if (dragActive) {
    uploaderClasses += " border-blue-400 bg-blue-50";
  } else if (error) {
    // 'error' here refers to the prop
    uploaderClasses += " border-red-300 bg-red-50";
  } else {
    uploaderClasses += " border-gray-300 hover:border-gray-400";
  }

  return (
    <div className="space-y-4">
      <div
        className={uploaderClasses} // Use the pre-calculated classes
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files)}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900">
            {uploading ? "Uploading..." : "Upload Images"}
          </p>
          <p className="text-sm text-gray-500">
            Drag and drop or click to select files
          </p>
        </label>
      </div>

      {error && ( // 'error' here refers to the prop
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={`Product ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      className="p-1 bg-white rounded text-gray-700 hover:bg-gray-100"
                      title="Move left"
                    >
                      ←
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      className="p-1 bg-white rounded text-gray-700 hover:bg-gray-100"
                      title="Move right"
                    >
                      →
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="p-1 bg-red-500 rounded text-white hover:bg-red-600"
                    title="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
