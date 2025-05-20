import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dkk1xih2f',
  api_key: '343831827957133',
  api_secret: 'Z5yn2Kfed_sLP9ofj2nXSIGns5o'
});

/**
 * Upload a file to Cloudinary
 * @param {File} file - The file to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} - Cloudinary upload response
 */
export const uploadToCloudinary = async (file, options = {}) => {
  return new Promise((resolve, reject) => {
    // Create upload stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'glodinas-cv-uploads',
        resource_type: 'auto',
        ...options
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('Cloudinary upload success:', result.secure_url);
          resolve(result);
        }
      }
    );

    // Convert file buffer to stream and pipe to upload stream
    const bufferStream = require('stream').Readable.from(file.buffer);
    bufferStream.pipe(uploadStream);
  });
};

export default cloudinary;
