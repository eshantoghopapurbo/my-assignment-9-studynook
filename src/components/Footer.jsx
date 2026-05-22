
"use client";

import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { FaInstagramSquare, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Footer() {
    return (
        <footer className="bg-[#eceff2]pt-12 md:pt-20 mt-5">

            {/* Bottom Footer */}
            <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">

                    {/* Brand */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#022654] mb-4">
                            StudyNook
                        </h1>
                        <p className="text-gray-500 leading-relaxed md:leading-8 text-sm md:text-base">
                            Premium academic spaces for focused study,
                            collaboration, and productivity.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className="text-lg md:text-xl font-semibold text-[#022654] mb-4">
                            Useful Links
                        </h3>
                        <div className="flex flex-col gap-3 text-sm md:text-base text-gray-600">
                            <Link href="/" className="hover:text-[#022654] transition">
                                Home
                            </Link>
                            <Link href="/rooms" className="hover:text-[#022654] transition">
                                Rooms
                            </Link>
                            <Link href="/about" className="hover:text-[#022654] transition">
                                About
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className="text-lg md:text-xl font-semibold text-[#022654] mb-4">
                            Contact
                        </h3>
                        <div className="flex flex-col gap-4 text-sm md:text-base text-gray-600 w-full items-center sm:items-start">
                            <div className="flex items-center gap-3 justify-center sm:justify-start">
                                <IoMdMail className="shrink-0" size={18} />
                                <p className="break-all">support@studynook.com</p>
                            </div>

                            <div className="flex items-center gap-3 justify-center sm:justify-start">
                                <FaPhoneAlt className="shrink-0" size={16} />
                                <p>+880 1234-567890</p>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className="text-lg md:text-xl font-semibold text-[#022654] mb-4">
                            Follow Us
                        </h3>
                        <div className="flex items-center gap-3.5 sm:gap-4 justify-center sm:justify-start flex-wrap">
                            <Link
                                href="https://facebook.com"
                                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:-translate-y-1 transition text-gray-700 hover:text-[#022654]"
                            >
                                <BsFacebook size={18} />
                            </Link>

                            <Link
                                href="https://x.com"
                                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:-translate-y-1 transition font-bold text-sm md:text-base text-gray-700 hover:text-[#022654]"
                            >
                                X
                            </Link>

                            <Link
                                href="https://linkedin.com"
                                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:-translate-y-1 transition text-gray-700 hover:text-[#022654]"
                            >
                                <FaLinkedin size={18} />
                            </Link>

                            <Link
                                href="https://instagram.com"
                                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:-translate-y-1 transition text-gray-700 hover:text-[#022654]"
                            >
                                <FaInstagramSquare size={18} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright & Policy Links */}
                <div className="border-t border-gray-200 mt-10 md:mt-14 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5">
                    <p className="text-gray-500 text-xs md:text-sm text-center md:text-left order-2 md:order-1">
                        © 2026 StudyNook Academic Spaces. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-500 order-1 md:order-2">
                        <Link href="/privacy" className="hover:text-[#022654] transition">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-[#022654] transition">Terms of Service</Link>
                        <Link href="/support" className="hover:text-[#022654] transition">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}