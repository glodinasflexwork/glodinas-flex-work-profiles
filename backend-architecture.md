# Backend Architecture for Glodinas Flex Work Form Submissions

## Overview
This document outlines the architecture for handling form submissions from the employer and job seeker pages on the Glodinas Flex Work website. The solution will use Next.js API routes, Prisma ORM, Neon PostgreSQL, and Stack Auth for authentication.

## Components

### 1. Database Schema (PostgreSQL on Neon)
- **Employers Table**
  - id (UUID, primary key)
  - company_name (String)
  - contact_person (String)
  - email (String)
  - phone (String)
  - industry (String)
  - job_requirements (Text)
  - workers_needed (Integer)
  - location (String)
  - created_at (DateTime)
  - status (String: 'pending', 'reviewed', 'contacted')

- **JobSeekers Table**
  - id (UUID, primary key)
  - first_name (String)
  - last_name (String)
  - email (String)
  - phone (String)
  - experience (String)
  - skills (Text)
  - availability (String)
  - preferred_location (String)
  - cv_url (String, optional)
  - created_at (DateTime)
  - status (String: 'pending', 'reviewed', 'matched')

- **Admins Table**
  - id (UUID, primary key)
  - email (String)
  - name (String)
  - role (String)
  - stack_auth_id (String)

### 2. API Routes (Next.js)
- **/api/employers/submit**
  - POST: Handle employer form submissions
  - Validate input data
  - Store in PostgreSQL database
  - Return confirmation

- **/api/job-seekers/submit**
  - POST: Handle job seeker form submissions
  - Validate input data
  - Handle file uploads (CV)
  - Store in PostgreSQL database
  - Return confirmation

- **/api/admin/employers**
  - GET: Retrieve employer submissions with filtering/pagination
  - PUT: Update employer submission status
  - DELETE: Remove employer submission

- **/api/admin/job-seekers**
  - GET: Retrieve job seeker submissions with filtering/pagination
  - PUT: Update job seeker submission status
  - DELETE: Remove job seeker submission

- **/api/admin/export**
  - GET: Generate and download CSV/Excel reports of submissions

### 3. Authentication (Stack Auth)
- Admin authentication using Stack Auth
- Protected API routes for admin operations
- Role-based access control

### 4. Admin Interface
- Dashboard with overview statistics
- Employer submissions management
- Job seeker submissions management
- Filtering and search capabilities
- Export functionality

## Implementation Plan

1. Set up Prisma ORM with the Neon PostgreSQL database
2. Create database schema using Prisma
3. Implement API routes for form submissions
4. Set up Stack Auth integration for admin authentication
5. Create admin dashboard interface
6. Implement export functionality
7. Test end-to-end submission flow

## Security Considerations
- Input validation on all form submissions
- Rate limiting to prevent abuse
- CSRF protection
- Secure handling of sensitive data (GDPR compliance)
- Authentication for all admin routes
- Secure file upload handling for CVs

## Performance Considerations
- Database indexing for faster queries
- Pagination for large datasets
- Optimized queries for admin dashboard
- Caching where appropriate
