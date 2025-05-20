import fs from 'fs';
import path from 'path';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../lib/prisma';
import { uploadToCloudinary } from '../../../lib/cloudinary';

// Handle different versions of formidable
let formidable;
try {
  // Try the newer ESM style import first
  formidable = require('formidable');
  // Check if it's the newer version with named exports
  if (formidable.default) {
    formidable = formidable.default;
  }
} catch (error) {
  console.error('Error importing formidable:', error);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// Enhanced logging function
function logEvent(type, message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    type,
    message,
    data
  };
  
  console.log(`[JOB-SEEKER-SUBMIT][${timestamp}][${type}] ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
  
  // Skip file logging in serverless environment
  if (process.env.NODE_ENV !== 'production') {
    try {
      const logDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      
      const logFile = path.join(logDir, 'job-seeker-submissions.log');
      fs.appendFileSync(
        logFile, 
        `${JSON.stringify(logEntry)}\n`
      );
    } catch (logError) {
      console.error('Error writing to log file:', logError);
    }
  }
}

// Use system temp directory for uploads in production/serverless environment
// This avoids the ENOENT error in Vercel serverless functions
const uploadDir = process.env.NODE_ENV === 'production' 
  ? os.tmpdir() 
  : path.join(process.cwd(), 'public', 'uploads');

logEvent('INFO', 'Using upload directory', { 
  path: uploadDir, 
  environment: process.env.NODE_ENV || 'development',
  isServerless: process.env.VERCEL === '1'
});

export default async function handler(req, res) {
  logEvent('INFO', 'Job seeker submission request received', { 
    method: req.method,
    url: req.url,
    headers: req.headers
  });

  // Only allow POST method
  if (req.method !== 'POST') {
    logEvent('ERROR', 'Method not allowed', { method: req.method });
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    logEvent('INFO', 'Initializing form parser');
    
    // Create form parser based on formidable version
    let form;
    if (typeof formidable === 'function') {
      // Old style: formidable is the constructor
      form = new formidable();
    } else if (formidable && formidable.IncomingForm) {
      // Middle versions: formidable.IncomingForm is the constructor
      form = new formidable.IncomingForm();
    } else if (formidable && typeof formidable.formidable === 'function') {
      // Newer versions with named exports
      form = formidable.formidable();
    } else {
      throw new Error('Could not initialize formidable form parser');
    }
    
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    
    // Log formidable configuration
    logEvent('DEBUG', 'Formidable configuration', { 
      uploadDir: form.uploadDir,
      keepExtensions: form.keepExtensions,
      maxFileSize: form.maxFileSize
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        logEvent('ERROR', 'Error parsing form', { error: err.toString(), stack: err.stack });
        return res.status(500).json({ 
          success: false,
          message: 'Error processing form data' 
        });
      }

      logEvent('INFO', 'Form parsed successfully', { 
        fieldCount: Object.keys(fields).length,
        fileCount: Object.keys(files).length
      });
      
      // Log received fields (excluding sensitive data)
      const safeFields = { ...fields };
      if (safeFields.email) safeFields.email = '***@***';
      if (safeFields.phone) safeFields.phone = '***';
      logEvent('DEBUG', 'Received form fields', safeFields);
      
      // Log received files
      const fileInfo = {};
      Object.keys(files).forEach(key => {
        const file = files[key];
        fileInfo[key] = {
          size: file.size,
          type: file.mimetype,
          name: file.originalFilename
        };
      });
      logEvent('DEBUG', 'Received files', fileInfo);

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
      const requiredFields = {
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        phone: !!phone,
        experience: !!experience,
        skills: !!skills,
        availability: !!availability,
        preferredLocation: !!preferredLocation
      };
      
      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
        
      if (missingFields.length > 0) {
        logEvent('ERROR', 'Missing required fields', { missingFields });
        return res.status(400).json({ 
          success: false,
          message: 'Missing required fields',
          fields: missingFields
        });
      }
      
      logEvent('INFO', 'All required fields present');

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        logEvent('ERROR', 'Invalid email format', { email: '***@***' });
        return res.status(400).json({ 
          success: false,
          message: 'Invalid email format'
        });
      }
      
      logEvent('INFO', 'Email format validated');

      // Handle CV file upload
      let cvUrl = null;
      if (files.cv) {
        try {
          const file = files.cv;
          
          logEvent('INFO', 'Processing CV file', { 
            originalName: file.originalFilename,
            size: file.size,
            type: file.mimetype,
            tempPath: file.filepath
          });
          
          // Read file content into buffer
          const fileBuffer = fs.readFileSync(file.filepath);
          
          // Upload to Cloudinary
          logEvent('INFO', 'Uploading CV to Cloudinary');
          
          try {
            // Create a file object with buffer for Cloudinary upload
            const fileForUpload = {
              buffer: fileBuffer,
              originalname: file.originalFilename || 'cv.pdf'
            };
            
            // Upload to Cloudinary
            const cloudinaryResult = await uploadToCloudinary(fileForUpload, {
              folder: 'glodinas-cv-uploads',
              resource_type: 'auto',
              public_id: `cv-${uuidv4()}`
            });
            
            // Store Cloudinary URL
            cvUrl = cloudinaryResult.secure_url;
            
            logEvent('INFO', 'CV uploaded to Cloudinary successfully', { 
              cloudinaryUrl: cvUrl,
              publicId: cloudinaryResult.public_id
            });
          } catch (cloudinaryError) {
            logEvent('ERROR', 'Error uploading to Cloudinary', { 
              error: cloudinaryError.toString(),
              stack: cloudinaryError.stack
            });
            // Continue without CV if Cloudinary upload fails
            cvUrl = null;
          }
          
          // Clean up temp file
          try {
            fs.unlinkSync(file.filepath);
            logEvent('INFO', 'Temporary file cleaned up');
          } catch (cleanupError) {
            logEvent('WARN', 'Failed to clean up temporary file', { 
              error: cleanupError.toString() 
            });
          }
          
        } catch (fileError) {
          logEvent('ERROR', 'Error processing CV file', { 
            error: fileError.toString(),
            stack: fileError.stack
          });
          // Continue without CV if there's an error
          cvUrl = null;
        }
      } else {
        logEvent('INFO', 'No CV file uploaded');
      }

      try {
        logEvent('INFO', 'Attempting to create job seeker record in database');
        
        // Log database connection status
        try {
          await prisma.$queryRaw`SELECT 1`;
          logEvent('INFO', 'Database connection successful');
        } catch (connError) {
          logEvent('ERROR', 'Database connection failed', { 
            error: connError.toString(),
            stack: connError.stack
          });
        }
        
        // Prepare data for database
        const jobSeekerData = {
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
        };
        
        logEvent('DEBUG', 'Job seeker data prepared', {
          ...jobSeekerData,
          email: '***@***',
          phone: '***'
        });
        
        // Create job seeker record in database
        const jobSeeker = await prisma.jobSeeker.create({
          data: jobSeekerData
        });

        logEvent('SUCCESS', 'Job seeker created successfully', { 
          id: jobSeeker.id,
          status: jobSeeker.status,
          createdAt: jobSeeker.createdAt
        });

        return res.status(201).json({ 
          success: true, 
          message: 'Job seeker application received successfully',
          data: {
            id: jobSeeker.id,
            status: jobSeeker.status
          }
        });
      } catch (dbError) {
        logEvent('ERROR', 'Database error creating job seeker', { 
          error: dbError.toString(),
          code: dbError.code,
          meta: dbError.meta,
          stack: dbError.stack
        });
        
        return res.status(500).json({ 
          success: false,
          message: 'Database error while processing your application',
          error: dbError.message
        });
      }
    });
  } catch (error) {
    logEvent('ERROR', 'Error submitting job seeker form', { 
      error: error.toString(),
      stack: error.stack
    });
    
    return res.status(500).json({ 
      success: false,
      message: 'An error occurred while processing your application',
      error: error.message
    });
  }
}
