// Script to directly query the database for job seeker entries
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkJobSeekers() {
  try {
    console.log('Querying database for all job seekers...');
    
    // Get all job seekers
    const allJobSeekers = await prisma.jobSeeker.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Total job seekers found: ${allJobSeekers.length}`);
    
    if (allJobSeekers.length > 0) {
      console.log('\nJob Seeker Records:');
      allJobSeekers.forEach((seeker, index) => {
        console.log(`\n--- Record ${index + 1} ---`);
        console.log(`ID: ${seeker.id}`);
        console.log(`Name: ${seeker.firstName} ${seeker.lastName}`);
        console.log(`Email: ${seeker.email}`);
        console.log(`Status: ${seeker.status}`);
        console.log(`Created At: ${seeker.createdAt}`);
      });
    } else {
      console.log('No job seeker records found in the database.');
    }
    
    // Get pending job seekers
    const pendingJobSeekers = await prisma.jobSeeker.findMany({
      where: { status: 'pending' },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`\nPending job seekers found: ${pendingJobSeekers.length}`);
    
    if (pendingJobSeekers.length > 0) {
      console.log('\nPending Job Seeker Records:');
      pendingJobSeekers.forEach((seeker, index) => {
        console.log(`\n--- Pending Record ${index + 1} ---`);
        console.log(`ID: ${seeker.id}`);
        console.log(`Name: ${seeker.firstName} ${seeker.lastName}`);
        console.log(`Email: ${seeker.email}`);
        console.log(`Created At: ${seeker.createdAt}`);
      });
    } else {
      console.log('No pending job seeker records found in the database.');
    }
    
  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
checkJobSeekers();
