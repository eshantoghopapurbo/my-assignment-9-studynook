import { Inter } from "next/font/google";
import "./globals.css";


import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Create Next App",
  description: "Study Room Booking Website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col {inter.className}" >
        <Navbar></Navbar>
        {children}
        <ToastContainer position="top-center" ></ToastContainer>
        <Footer></Footer>
        </body>
    </html>
  );
}
