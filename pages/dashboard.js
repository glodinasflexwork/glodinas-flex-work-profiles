import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";

export const runtime = 'edge';

export default function Dashboard({ user }) {
  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 border rounded shadow-sm">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name || user.email} 👋</h1>
      <p className="text-gray-600">This is your protected dashboard.</p>

      <button
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}