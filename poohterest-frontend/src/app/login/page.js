"use client";
import { useState } from "react";

import { useRouter} from "next/navigation";
import Link from "next/link";
import { FaPinterest } from "react-icons/fa";
import { login } from "@/services/api";

export default function LoginPage() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);

    try {
      await login(data);
      router.push('/pin')
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className=" bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center text-blue-950 mb-8">
          <FaPinterest className="w-20 h-20" />
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            WELCOME TO POOHTEREST
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              required
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              required
            />
          </div>

          <div className="text-sm text-center">
            <Link
              href="/register"
              className="text-blue-950 hover:text-blue-900"
            >
              Register
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-950 text-white py-3 rounded-full hover:bg-blue-900 transition-colors duration-200 font-semibold"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
