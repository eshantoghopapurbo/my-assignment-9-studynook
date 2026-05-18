"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full border-b border-gray-200 bg-[#f7f8fa] relative z-50">
            <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                {/* Logo & Hamburger Wrapper */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <Link href="/" className="flex items-center gap-2">
                        <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-[#0b2343]" />
                        <h1 className="text-2xl md:text-3xl font-bold text-[#0b2343]">
                            StudyNook
                        </h1>
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#0b2343] focus:outline-none md:hidden"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>

                {/* Navigation Links and Buttons Link */}
                <div
                    className={`${isOpen ? "flex" : "hidden"
                        } md:flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-12 w-full md:w-auto mt-4 md:mt-0 transition-all duration-300`}
                >
                    {/* Nav Links */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-base md:text-lg font-medium">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="text-[#0b2343]  w-max"
                        >
                            Home
                        </Link>

                        <Link
                            href="/rooms"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-600 hover:text-[#0b2343] transition w-max"
                        >
                            Rooms
                        </Link>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-gray-200">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-700 hover:text-[#0b2343] font-medium transition text-center md:text-left"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="bg-[#0b2343] text-white px-5 py-2 rounded-lg hover:bg-[#13345f] transition font-medium text-center"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}