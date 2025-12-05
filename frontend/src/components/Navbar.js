"use client";
import Link from "next/link";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Book Review
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/" className="text-white hover:underline">Home</Link>
          {user ? (
            <>
              <span className="text-white font-semibold">{user.name}</span> {/* Display User's Full Name */}
              <button
                onClick={logout}
                className="text-white hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:underline">Login</Link>
              <Link href="/register" className="text-white hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
