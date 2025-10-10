-- Cloudflare D1 Database Schema
-- SQLite-compatible schema for Glodinas Flex Work

-- User table (unified authentication)
CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT,
  role TEXT NOT NULL,
  clerkId TEXT UNIQUE NOT NULL,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL
);

CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_user_clerkId ON User(clerkId);
CREATE INDEX idx_user_role ON User(role);

-- Admin profile
CREATE TABLE IF NOT EXISTS AdminProfile (
  id TEXT PRIMARY KEY,
  position TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  userId TEXT UNIQUE NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

CREATE INDEX idx_admin_userId ON AdminProfile(userId);

-- Employer profile
CREATE TABLE IF NOT EXISTS EmployerProfile (
  id TEXT PRIMARY KEY,
  companyName TEXT NOT NULL,
  contactPerson TEXT NOT NULL,
  phone TEXT NOT NULL,
  industry TEXT,
  location TEXT,
  status TEXT DEFAULT 'pending',
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  userId TEXT UNIQUE NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

CREATE INDEX idx_employer_userId ON EmployerProfile(userId);
CREATE INDEX idx_employer_status ON EmployerProfile(status);

-- Worker profile
CREATE TABLE IF NOT EXISTS WorkerProfile (
  id TEXT PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience TEXT,
  skills TEXT,
  availability TEXT,
  preferredLocation TEXT,
  resumeUrl TEXT,
  coverLetterUrl TEXT,
  status TEXT DEFAULT 'pending',
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  userId TEXT UNIQUE NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

CREATE INDEX idx_worker_userId ON WorkerProfile(userId);
CREATE INDEX idx_worker_status ON WorkerProfile(status);

-- Subscription
CREATE TABLE IF NOT EXISTS Subscription (
  id TEXT PRIMARY KEY,
  tier TEXT NOT NULL,
  jobPostingLimit INTEGER DEFAULT 3,
  activeJobsCount INTEGER DEFAULT 0,
  startDate INTEGER NOT NULL,
  endDate INTEGER,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  employerId TEXT UNIQUE NOT NULL,
  FOREIGN KEY (employerId) REFERENCES EmployerProfile(id) ON DELETE CASCADE
);

CREATE INDEX idx_subscription_employerId ON Subscription(employerId);

-- Job posting
CREATE TABLE IF NOT EXISTS JobPosting (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  location TEXT NOT NULL,
  jobType TEXT NOT NULL,
  salary TEXT,
  status TEXT DEFAULT 'DRAFT',
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  employerId TEXT NOT NULL,
  FOREIGN KEY (employerId) REFERENCES EmployerProfile(id)
);

CREATE INDEX idx_jobposting_employerId ON JobPosting(employerId);
CREATE INDEX idx_jobposting_status ON JobPosting(status);

-- Application
CREATE TABLE IF NOT EXISTS Application (
  id TEXT PRIMARY KEY,
  status TEXT DEFAULT 'PENDING',
  coverLetter TEXT,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  jobPostingId TEXT NOT NULL,
  workerId TEXT NOT NULL,
  FOREIGN KEY (jobPostingId) REFERENCES JobPosting(id),
  FOREIGN KEY (workerId) REFERENCES WorkerProfile(id)
);

CREATE INDEX idx_application_jobPostingId ON Application(jobPostingId);
CREATE INDEX idx_application_workerId ON Application(workerId);
CREATE INDEX idx_application_status ON Application(status);

-- Legacy tables (for backward compatibility)
CREATE TABLE IF NOT EXISTS Employer (
  id TEXT PRIMARY KEY,
  companyName TEXT NOT NULL,
  contactPerson TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  industry TEXT NOT NULL,
  jobRequirements TEXT NOT NULL,
  workersNeeded INTEGER NOT NULL,
  location TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  status TEXT DEFAULT 'pending'
);

CREATE INDEX idx_legacy_employer_status ON Employer(status);

CREATE TABLE IF NOT EXISTS JobSeeker (
  id TEXT PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience TEXT NOT NULL,
  skills TEXT NOT NULL,
  availability TEXT NOT NULL,
  preferredLocation TEXT NOT NULL,
  cvUrl TEXT,
  createdAt INTEGER NOT NULL,
  status TEXT DEFAULT 'pending'
);

CREATE INDEX idx_jobseeker_status ON JobSeeker(status);

CREATE TABLE IF NOT EXISTS Admin (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  stackAuthId TEXT UNIQUE NOT NULL
);

CREATE INDEX idx_admin_email ON Admin(email);

