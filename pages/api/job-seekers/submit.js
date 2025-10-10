import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../lib/prisma';
import { uploadToCloudinary } from '../../../lib/cloudinary';

// Enable built-in Next.js body parser for multipart form data
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
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
}

export default async function handler(req, res) {
  logEvent('INFO', 'Job seeker submission request received', { 
    method: req.method,
    url: req.url
  });

  // Only allow POST method
  if (req.method !== 'POST') {
    logEvent('ERROR', 'Method not allowed', { method: req.method });
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // With bodyParser enabled, form data is available in req.body
    const formData = req.body;
    
    logEvent('INFO', 'Processing form data');
    
    // Extract fields from form data
    const {
      firstName,
      lastName,
      email,
      phone,
      experience,
      skills,
      availability,
      preferredLocation
    } = formData;

    // Log received fields (excluding sensitive data)
    const safeFields = { ...formData };
    if (safeFields.email) safeFields.email = '***@***';
    if (safeFields.phone) safeFields.phone = '***';
    logEvent('DEBUG', 'Received form fields', safeFields);

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

    // For now, we'll skip file uploads since we're using the built-in body parser
    // In a future update, we'll implement client-side direct upload to Cloudinary
    const cvUrl = null;
    logEvent('INFO', 'File upload skipped in this version');

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
