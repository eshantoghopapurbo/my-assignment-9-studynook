"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { data } = authClient.useSession();
    const user = data?.user;
    const router = useRouter();

    // console.log(user, 'navbar');

    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // redirect to login page
                },
            },
        });
    };


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
                    <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 md:gap-8 text-base md:text-lg font-medium">
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


                        {
                            user && <>
                                <Link
                                    href="/addroom"
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-600 hover:text-[#0b2343] transition w-max"
                                >
                                    Add Room
                                </Link>
                                <Link
                                    href="/mylistings"
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-600 hover:text-[#0b2343] transition w-max"
                                >
                                    My Listings
                                </Link>
                                <Link
                                    href="/mybookings"
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-600 hover:text-[#0b2343] transition w-max"
                                >
                                    My Bookings
                                </Link>
                            </>
                        }


                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-gray-200">
                        {
                            user ? <>

                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center space-x-3 focus:outline-none bg-gray-50 hover:bg-gray-100 p-2 rounded-full md:rounded-lg transition-all duration-200"
                                    >

                                        <Image
                                            width={100}
                                            height={100}
                                            className="h-9 w-9 rounded-full object-cover border-2 border-indigo-500"
                                            src={user?.image || "https://i.pravatar.cc/300?img=12"}
                                            alt={user.name}
                                        />

                                        <span className="hidden md:block text-sm font-medium text-gray-750">
                                            {user.name}
                                        </span>

                                        <svg className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>


                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50">

                                            <a
                                                href="#profile"
                                                className="flex items-center px-4 py-2.5 text-sm text-gray-750 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                </svg>
                                                My Profile
                                            </a>


                                            <hr className="my-1 border-gray-100" />


                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center text-left px-4 py-2.5 text-sm text-red-650 hover:bg-red-50 hover:text-red-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                                </svg>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </> :
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className=" bg-white text-bold px-5 py-2 rounded-lg  hover:bg-blue-500  transition font-medium text-center"
                                    >
                                        Login
                                    </Link>
 
                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="bg-white font-bold px-5 py-2 rounded-lg hover:bg-blue-500 transition font-medium text-center"
                                    >
                                        Register
                                    </Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}