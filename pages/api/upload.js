import cloudinary from '../../lib/cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Form parsing error:', err);
          res.status(500).json({ error: 'Error parsing form' });
          return resolve();
        }

        try {
          const fileKey = Object.keys(files)[0];
          const file = files[fileKey];
          
          if (!file) {
            res.status(400).json({ error: 'No file uploaded' });
            return resolve();
          }

          const filePath = file.filepath;
          const fileType = file.mimetype;
          
          // Check file type
          const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg'];
          if (!allowedTypes.includes(fileType)) {
            res.status(400).json({ error: 'Invalid file type. Only PDF, DOCX, and JPG are allowed.' });
            return resolve();
          }

          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
            folder: 'glodinas-flex-work/resumes',
          });

          // Remove temp file
          fs.unlinkSync(filePath);

          res.status(200).json({ 
            url: result.secure_url,
            public_id: result.public_id 
          });
          return resolve();
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          res.status(500).json({ error: 'Error uploading file' });
          return resolve();
        }
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
