import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-6 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 border rounded shadow-sm">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user.firstName || user.emailAddresses[0].emailAddress} 👋
      </h1>
      <p className="text-gray-600">This is your protected dashboard.</p>

      <button
        onClick={() => signOut(() => router.push('/'))}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

