import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';
import { stringify } from 'csv-stringify';

export default async function handler(req, res) {
  // Check authentication
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify admin role
  const admin = await prisma.admin.findUnique({
    where: { email: session.user.email }
  });

  if (!admin) {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }

  // Only allow GET method
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, format = 'csv' } = req.query;
    
    if (!type || !['employers', 'job-seekers'].includes(type)) {
      return res.status(400).json({ message: 'Valid export type is required (employers or job-seekers)' });
    }
    
    if (format !== 'csv') {
      return res.status(400).json({ message: 'Only CSV format is currently supported' });
    }
    
    let data = [];
    let filename = '';
    let headers = [];
    
    // Get data based on type
    if (type === 'employers') {
      data = await prisma.employer.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      filename = `employers-export-${new Date().toISOString().split('T')[0]}.csv`;
      
      headers = [
        { key: 'companyName', header: 'Company Name' },
        { key: 'contactPerson', header: 'Contact Person' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Phone' },
        { key: 'industry', header: 'Industry' },
        { key: 'jobRequirements', header: 'Job Requirements' },
        { key: 'workersNeeded', header: 'Workers Needed' },
        { key: 'location', header: 'Location' },
        { key: 'status', header: 'Status' },
        { key: 'createdAt', header: 'Submission Date' }
      ];
    } else {
      data = await prisma.jobSeeker.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      filename = `job-seekers-export-${new Date().toISOString().split('T')[0]}.csv`;
      
      headers = [
        { key: 'firstName', header: 'First Name' },
        { key: 'lastName', header: 'Last Name' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Phone' },
        { key: 'experience', header: 'Experience' },
        { key: 'skills', header: 'Skills' },
        { key: 'availability', header: 'Availability' },
        { key: 'preferredLocation', header: 'Preferred Location' },
        { key: 'cvUrl', header: 'CV URL' },
        { key: 'status', header: 'Status' },
        { key: 'createdAt', header: 'Submission Date' }
      ];
    }
    
    // Format dates for CSV
    data = data.map(item => ({
      ...item,
      createdAt: new Date(item.createdAt).toISOString().split('T')[0]
    }));
    
    // Create CSV using csv-stringify
    const stringifier = stringify({ 
      header: true,
      columns: headers 
    });
    
    // Convert data to CSV
    let csvData = '';
    stringifier.on('readable', function() {
      let chunk;
      while ((chunk = stringifier.read()) !== null) {
        csvData += chunk;
      }
    });
    
    stringifier.on('error', function(err) {
      console.error('CSV stringify error:', err);
      return res.status(500).json({ message: 'Error generating CSV' });
    });
    
    stringifier.on('finish', function() {
      // Set headers for file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      
      // Send CSV data
      return res.status(200).send(csvData);
    });
    
    // Write data to stringifier
    data.forEach(item => stringifier.write(item));
    stringifier.end();
    
  } catch (error) {
    console.error('Error exporting data:', error);
    return res.status(500).json({ message: 'Error exporting data' });
  }
}
