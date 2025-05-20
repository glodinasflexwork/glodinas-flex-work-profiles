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
        // This is where you would verify credentials against Stack Auth
        // For now, we'll use a simple check for demo purposes
        
        // In production, you would integrate with Stack Auth API using:
        // NEXT_PUBLIC_STACK_PROJECT_ID='68f8f8cf-6561-4595-b30b-9da9df1ee374'
        // NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='pck_1xwpez162s56rzexr8qzc8nrqkrs0f4m2fs44yz7rxxvr'
        // STACK_SECRET_SERVER_KEY='ssk_k460e0dgd0h8jpjtr6sagkkp97kvnnm50hzw43bk6h0d0'
        
        try {
          console.log('Auth attempt:', credentials.email);
          
          // For demo purposes, always allow the demo admin login
          if (credentials.email === 'admin@glodinasflexwork.nl' && credentials.password === 'admin123') {
            console.log('Demo admin login detected');
            
            // Check if admin exists in database
            let admin = await prisma.admin.findUnique({
              where: { email: credentials.email }
            });
            
            if (!admin) {
              console.log('Creating new admin user');
              try {
                admin = await prisma.admin.create({
                  data: {
                    email: 'admin@glodinasflexwork.nl',
                    name: 'Admin User',
                    role: 'admin',
                    stackAuthId: 'demo-admin-id'
                  }
                });
                console.log('Admin created successfully:', admin.id);
              } catch (createError) {
                console.error('Error creating admin:', createError);
                // Fallback for demo purposes
                return {
                  id: 'demo-id',
                  email: 'admin@glodinasflexwork.nl',
                  name: 'Admin User',
                  role: 'admin'
                };
              }
            } else {
              console.log('Admin user found:', admin.id);
            }
            
            return {
              id: admin?.id || 'demo-id',
              email: admin?.email || 'admin@glodinasflexwork.nl',
              name: admin?.name || 'Admin User',
              role: admin?.role || 'admin'
            };
          }
          
          // Regular admin check
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email }
          });
          
          if (!admin) {
            console.log('Admin not found');
            return null;
          }
          
          // In production, verify password with Stack Auth
          // For demo, use a simple check
          if (credentials.password === 'admin123') {
            console.log('Password verified for:', admin.email);
            return {
              id: admin.id,
              email: admin.email,
              name: admin.name,
              role: admin.role
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
    signIn: '/admin/login',
    error: '/admin/error',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-for-development',
};

export default NextAuth(authOptions);
