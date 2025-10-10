import { getAuth } from '@clerk/nextjs/server';

export const runtime = 'edge';

export default async function handler(req) {
  return new Response(JSON.stringify({ 
    message: 'This endpoint is being migrated to D1. Coming soon!' 
  }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
}
