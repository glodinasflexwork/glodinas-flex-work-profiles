# Employer Dashboard Design Document

## Overview
This document outlines the design for the Glodinas Flex Work employer dashboard, which will allow employers to manage their company profile, post job listings, and view matched candidates.

## Authentication System

### Requirements
- Maintain separate registration flows for different user types
  - Job seekers: https://glodinasflexwork.nl/en/job-seekers
  - Employers: https://glodinasflexwork.nl/en/employers
  - Admin: Internal access only
- Unified login page that directs users to role-specific dashboards
- Fixed roles after registration (no role switching)

### Authentication Flow
1. User registers through role-specific registration page
2. User logs in through unified login page
3. System identifies user role and redirects to appropriate dashboard
4. Role-based access controls restrict functionality based on user type

## Employer Dashboard Structure

### Main Sections
1. **Dashboard Overview**
   - Summary statistics (active jobs, candidate matches)
   - Subscription status and limits
   - Recent activity

2. **Company Profile Management**
   - View company information
   - Edit limited fields (VAT number, contact details)
   - Company logo management
   - Note: Company name and KVK number can only be edited by admins

3. **Job Posting Management**
   - Create new job postings
   - Edit existing job postings
   - Change job status (active, closed, draft)
   - View posting statistics
   - Posting limits based on subscription tier

4. **Candidate Matching**
   - View detailed candidate profiles
   - Filter/sort candidates by specific criteria
   - Rating system showing match quality
   - Actions for candidate management

### Navigation
- Sidebar navigation with clear section indicators
- Breadcrumb navigation for deeper pages
- Quick action buttons for common tasks

## Database Schema Updates

### Job Posting Table
```
JobPosting {
  id: UUID (PK)
  employerId: UUID (FK)
  title: String
  description: Text
  requirements: Text
  location: String
  salary: Range
  status: Enum (ACTIVE, CLOSED, DRAFT)
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Subscription Table
```
Subscription {
  id: UUID (PK)
  employerId: UUID (FK)
  tier: Enum (BASIC, PREMIUM, ENTERPRISE)
  jobPostingLimit: Integer
  activeJobsCount: Integer
  startDate: DateTime
  endDate: DateTime
}
```

### Candidate Match Table
```
CandidateMatch {
  id: UUID (PK)
  jobPostingId: UUID (FK)
  jobSeekerId: UUID (FK)
  matchScore: Float
  matchCriteria: JSON
  status: Enum (NEW, VIEWED, CONTACTED, REJECTED)
  createdAt: DateTime
  updatedAt: DateTime
}
```

## User Interface Wireframes

### Dashboard Overview
```
+-------------------------------------------------------+
|                                                       |
|  LOGO                                      User Menu  |
|                                                       |
+-------------------------------------------------------+
|        |                                              |
|        |  Welcome, [Company Name]                     |
|        |                                              |
|        |  +------------+  +------------+  +---------+ |
|        |  | Active Jobs |  | Candidates |  |  Limit  | |
|        |  |      5      |  |     12     |  |  8/10   | |
| SIDE   |  +------------+  +------------+  +---------+ |
| BAR    |                                              |
|        |  Recent Activity                             |
| MENU   |  - New candidate match for [Job Title]       |
|        |  - Job posting [Title] expires in 3 days     |
|        |  - 2 new applications for [Job Title]        |
|        |                                              |
|        |  Quick Actions                               |
|        |  [Post New Job]  [View Candidates]           |
|        |                                              |
+-------------------------------------------------------+
```

### Job Posting Management
```
+-------------------------------------------------------+
|                                                       |
|  LOGO                                      User Menu  |
|                                                       |
+-------------------------------------------------------+
|        |                                              |
|        |  Job Postings                [+ New Job]     |
|        |                                              |
|        |  Filters: [Status ▼] [Location ▼] [Search]   |
|        |                                              |
|        |  +----------------------------------------+  |
| SIDE   |  | Title          | Status  | Candidates  |  |
| BAR    |  +----------------------------------------+  |
|        |  | Software Dev   | Active  | 8 matches   |  |
| MENU   |  | Warehouse Op   | Active  | 12 matches  |  |
|        |  | Office Admin   | Draft   | -           |  |
|        |  | Driver         | Closed  | 3 hired     |  |
|        |  +----------------------------------------+  |
|        |                                              |
|        |  Showing 4 of 10 job postings                |
|        |  Subscription limit: 10 active jobs          |
|        |                                              |
+-------------------------------------------------------+
```

### Candidate Matching View
```
+-------------------------------------------------------+
|                                                       |
|  LOGO                                      User Menu  |
|                                                       |
+-------------------------------------------------------+
|        |                                              |
|        |  Candidates for: Software Developer          |
|        |                                              |
|        |  Filters: [Match Score ▼] [Experience ▼]     |
|        |                                              |
| SIDE   |  +----------------------------------------+  |
| BAR    |  | ★★★★☆ 85% | John D.                    |  |
|        |  | 5 yrs exp | React, Node.js, MongoDB    |  |
| MENU   |  | Available | [View Profile] [Contact]   |  |
|        |  +----------------------------------------+  |
|        |  | ★★★☆☆ 72% | Sarah M.                   |  |
|        |  | 3 yrs exp | Angular, Python, SQL       |  |
|        |  | 2wk notice| [View Profile] [Contact]   |  |
|        |  +----------------------------------------+  |
|        |  | ★★★☆☆ 68% | Michael T.                 |  |
|        |  | 4 yrs exp | Java, Spring, Oracle       |  |
|        |  | Available | [View Profile] [Contact]   |  |
|        |  +----------------------------------------+  |
|        |                                              |
+-------------------------------------------------------+
```

## Next Steps
1. Review wireframes and design with stakeholders
2. Finalize database schema changes
3. Implement authentication system updates
4. Develop employer dashboard frontend components
5. Create backend API endpoints for dashboard functionality
6. Integrate and test end-to-end workflow
