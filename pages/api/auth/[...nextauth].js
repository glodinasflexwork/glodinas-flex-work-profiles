import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('Auth attempt:', credentials.email);
          
          // Check for demo admin login
          if (credentials.email === 'admin@glodinasflexwork.nl' && credentials.password === 'admin123') {
            console.log('Demo admin login detected');
            
            // Check if admin exists in unified User model
            let adminUser = await prisma.user.findUnique({
              where: { email: credentials.email },
              include: { adminProfile: true }
            });
            
            if (!adminUser) {
              console.log('Creating new admin user');
              try {
                // Create user with admin role
                adminUser = await prisma.user.create({
                  data: {
                    email: 'admin@glodinasflexwork.nl',
                    name: 'Admin User',
                    role: 'ADMIN',
                    stackAuthId: 'demo-admin-id',
                    adminProfile: {
                      create: {
                        position: 'System Administrator'
                      }
                    }
                  },
                  include: { adminProfile: true }
                });
                console.log('Admin created successfully:', adminUser.id);
              } catch (createError) {
                console.error('Error creating admin:', createError);
                // Fallback for demo purposes
                return {
                  id: 'demo-id',
                  email: 'admin@glodinasflexwork.nl',
                  name: 'Admin User',
                  role: 'ADMIN'
                };
              }
            } else {
              console.log('Admin user found:', adminUser.id);
            }
            
            return {
              id: adminUser?.id || 'demo-id',
              email: adminUser?.email || 'admin@glodinasflexwork.nl',
              name: adminUser?.name || 'Admin User',
              role: adminUser?.role || 'ADMIN'
            };
          }
          
          // Demo employer login for testing
          if (credentials.email === 'employer@glodinasflexwork.nl' && credentials.password === 'employer123') {
            console.log('Demo employer login detected');
            
            // Check if employer exists in unified User model
            let employerUser = await prisma.user.findUnique({
              where: { email: credentials.email },
              include: { employerProfile: true }
            });
            
            if (!employerUser) {
              console.log('Creating new employer user');
              try {
                // Create user with employer role
                employerUser = await prisma.user.create({
                  data: {
                    email: 'employer@glodinasflexwork.nl',
                    name: 'Demo Employer',
                    role: 'EMPLOYER',
                    employerProfile: {
                      create: {
                        companyName: 'Demo Company',
                        contactPerson: 'John Doe',
                        phone: '+31612345678',
                        industry: 'Technology',
                        location: 'Amsterdam',
                        status: 'approved',
                        subscription: {
                          create: {
                            tier: 'PREMIUM',
                            jobPostingLimit: 10,
                            activeJobsCount: 0
                          }
                        }
                      }
                    }
                  },
                  include: { employerProfile: true }
                });
                console.log('Employer created successfully:', employerUser.id);
              } catch (createError) {
                console.error('Error creating employer:', createError);
                // Fallback for demo purposes
                return {
                  id: 'demo-employer-id',
                  email: 'employer@glodinasflexwork.nl',
                  name: 'Demo Employer',
                  role: 'EMPLOYER'
                };
              }
            } else {
              console.log('Employer user found:', employerUser.id);
            }
            
            return {
              id: employerUser?.id || 'demo-employer-id',
              email: employerUser?.email || 'employer@glodinasflexwork.nl',
              name: employerUser?.name || 'Demo Employer',
              role: employerUser?.role || 'EMPLOYER'
            };
          }
          
          // Demo worker login for testing
          if (credentials.email === 'worker@glodinasflexwork.nl' && credentials.password === 'worker123') {
            console.log('Demo worker login detected');
            
            // Check if worker exists in unified User model
            let workerUser = await prisma.user.findUnique({
              where: { email: credentials.email },
              include: { workerProfile: true }
            });
            
            if (!workerUser) {
              console.log('Creating new worker user');
              try {
                // Create user with worker role
                workerUser = await prisma.user.create({
                  data: {
                    email: 'worker@glodinasflexwork.nl',
                    name: 'Demo Worker',
                    role: 'WORKER',
                    workerProfile: {
                      create: {
                        firstName: 'Demo',
                        lastName: 'Worker',
                        phone: '+31687654321',
                        experience: '3-5 years',
                        skills: 'JavaScript, React, Node.js',
                        availability: 'Full-time',
                        preferredLocation: 'Amsterdam',
                        status: 'approved'
                      }
                    }
                  },
                  include: { workerProfile: true }
                });
                console.log('Worker created successfully:', workerUser.id);
              } catch (createError) {
                console.error('Error creating worker:', createError);
                // Fallback for demo purposes
                return {
                  id: 'demo-worker-id',
                  email: 'worker@glodinasflexwork.nl',
                  name: 'Demo Worker',
                  role: 'WORKER'
                };
              }
            } else {
              console.log('Worker user found:', workerUser.id);
            }
            
            return {
              id: workerUser?.id || 'demo-worker-id',
              email: workerUser?.email || 'worker@glodinasflexwork.nl',
              name: workerUser?.name || 'Demo Worker',
              role: workerUser?.role || 'WORKER'
            };
          }
          
          // Regular user lookup in unified User model
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          
          if (!user) {
            console.log('User not found');
            return null;
          }
          
          // In production, verify password with Stack Auth
          // For demo, use a simple check
          if (credentials.password === 'password123') {
            console.log('Password verified for:', user.email);
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            };
          }
          
          console.log('Invalid password');
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-for-development',
};

export default NextAuth(authOptions);
