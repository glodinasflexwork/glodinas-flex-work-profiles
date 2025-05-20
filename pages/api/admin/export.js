import prisma from '../../../lib/prisma';
import { getSession } from '@auth/stack';
import { createObjectCsvStringifier } from 'csv-writer';

export default async function handler(req, res) {
  // Check authentication
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify admin role
  const admin = await prisma.admin.findUnique({
    where: { stackAuthId: session.user.id }
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
        { id: 'companyName', title: 'Company Name' },
        { id: 'contactPerson', title: 'Contact Person' },
        { id: 'email', title: 'Email' },
        { id: 'phone', title: 'Phone' },
        { id: 'industry', title: 'Industry' },
        { id: 'jobRequirements', title: 'Job Requirements' },
        { id: 'workersNeeded', title: 'Workers Needed' },
        { id: 'location', title: 'Location' },
        { id: 'status', title: 'Status' },
        { id: 'createdAt', title: 'Submission Date' }
      ];
    } else {
      data = await prisma.jobSeeker.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      filename = `job-seekers-export-${new Date().toISOString().split('T')[0]}.csv`;
      
      headers = [
        { id: 'firstName', title: 'First Name' },
        { id: 'lastName', title: 'Last Name' },
        { id: 'email', title: 'Email' },
        { id: 'phone', title: 'Phone' },
        { id: 'experience', title: 'Experience' },
        { id: 'skills', title: 'Skills' },
        { id: 'availability', title: 'Availability' },
        { id: 'preferredLocation', title: 'Preferred Location' },
        { id: 'cvUrl', title: 'CV URL' },
        { id: 'status', title: 'Status' },
        { id: 'createdAt', title: 'Submission Date' }
      ];
    }
    
    // Format dates for CSV
    data = data.map(item => ({
      ...item,
      createdAt: new Date(item.createdAt).toISOString().split('T')[0]
    }));
    
    // Create CSV
    const csvStringifier = createObjectCsvStringifier({ header: headers });
    const csvHeader = csvStringifier.getHeaderString();
    const csvBody = csvStringifier.stringifyRecords(data);
    const csv = csvHeader + csvBody;
    
    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    
    // Send CSV data
    return res.status(200).send(csv);
  } catch (error) {
    console.error('Error exporting data:', error);
    return res.status(500).json({ message: 'Error exporting data' });
  }
}
