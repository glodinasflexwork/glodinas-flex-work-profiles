import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import prisma from '../../../lib/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ 
          success: false,
          message: 'Error processing form data' 
        });
      }

      // Extract fields
      const {
        firstName,
        lastName,
        email,
        phone,
        experience,
        skills,
        availability,
        preferredLocation
      } = fields;

      // Validate required fields
      if (!firstName || !lastName || !email || !phone || !experience || !skills || !availability || !preferredLocation) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Handle CV file upload
      let cvUrl = null;
      if (files.cv) {
        const file = files.cv;
        const fileName = `${uuidv4()}-${file.originalFilename}`;
        const newPath = path.join(uploadDir, fileName);
        
        // Rename the file
        fs.renameSync(file.filepath, newPath);
        
        // Store the relative URL
        cvUrl = `/uploads/${fileName}`;
      }

      try {
        // Create job seeker record in database
        const jobSeeker = await prisma.jobSeeker.create({
          data: {
            firstName: firstName.toString(),
            lastName: lastName.toString(),
            email: email.toString(),
            phone: phone.toString(),
            experience: experience.toString(),
            skills: skills.toString(),
            availability: availability.toString(),
            preferredLocation: preferredLocation.toString(),
            cvUrl,
            status: 'pending'
          }
        });

        console.log('Job seeker created successfully:', jobSeeker.id);

        return res.status(201).json({ 
          success: true, 
          message: 'Job seeker application received successfully',
          data: jobSeeker 
        });
      } catch (dbError) {
        console.error('Database error creating job seeker:', dbError);
        return res.status(500).json({ 
          success: false,
          message: 'Database error while processing your application',
          error: dbError.message
        });
      }
    });
  } catch (error) {
    console.error('Error submitting job seeker form:', error);
    return res.status(500).json({ 
      success: false,
      message: 'An error occurred while processing your application',
      error: error.message
    });
  }
}
