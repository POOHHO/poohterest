"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaPinterest, FaUser } from "react-icons/fa";
export default function Navbar() {
  const [isLogin, setLogin] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token);

    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/pin"
              className="text-blue-900 hover:bg-gray-100 p-2 rounded-full"
            >
              <FaPinterest className="w-6 h-6" />
            </Link>
            <Link
              href="/pin"
              className="font-semibold px-4 py-2 rounded-full hover:bg-gray-100"
            >
              Home
            </Link>
            {isLogin && (
              <Link
                href="/createpin"
                className="font-semibold px-4 py-2 rounded-full hover:bg-gray-100"
              >
                Create
              </Link>
            )}
          </div>

          {/* <div className="flex-1 max-w-2xl px-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div> */}

          <div className="flex items-center space-x-2">
            {isLogin === null ? (
              <div>Loading...</div>
            ) : isLogin ? (
              <>
                <Link href="/profile">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <FaUser className="w-6 h-6 text-gray-700" />
                  </button>
                </Link>
                <Link
                  href="/login"
                  className="font-semibold px-4 py-2 rounded-full text-white bg-blue-950 hover:bg-blue-900"
                  onClick={() => {
                    localStorage.clear();
                    setLogin(false);
                  }}
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="font-semibold px-4 py-2 rounded-full text-white bg-blue-950 hover:bg-blue-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
