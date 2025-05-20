import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dkk1xih2f',
  api_key: 'REDACTED_CLOUDINARY_API_KEY',
  api_secret: 'REDACTED_CLOUDINARY_API_SECRET'
});

export default cloudinary;
