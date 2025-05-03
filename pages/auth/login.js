import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.ok) {
      router.push(`/${router.locale}/dashboard`);
    } else {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: `/${router.locale}/dashboard`,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded font-semibold"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="mb-2">or</p>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}