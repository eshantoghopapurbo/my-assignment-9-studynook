"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-[#f7f8fa]">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-[#0b2343]" />
          <h1 className="text-3xl font-bold text-[#0b2343]">
            StudyNook
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-175">
          <div className="flex items-center gap-8 text-lg font-medium">
            
            <Link
              href="/"
              className="text-[#0b2343] border-b-2 border-[#0b2343] pb-1"
            >
              Home
            </Link>

            <Link
              href="/rooms"
              className="text-gray-600 hover:text-[#0b2343] transition"
            >
              Rooms
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-[#0b2343] font-medium transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-[#0b2343] text-white px-5 py-2 rounded-lg hover:bg-[#13345f] transition font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}