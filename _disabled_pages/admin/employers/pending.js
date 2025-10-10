import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PendingEmployers() {
  const router = useRouter();
  
  // Redirect to employers page with status=pending filter
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    router.replace({
      pathname: '/admin/employers',
      query: { status: 'pending' }
    });
  }, [router]);
  
  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading pending employers...</p>
      </div>
    </div>
  );
}
