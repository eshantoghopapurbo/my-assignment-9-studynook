"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BookingCard() {
  const { data } = authClient.useSession();
  const user = data?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const getBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/mybookins?email=${user?.email}`
        );

        const data = await res.json();

        setBookings(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, [user]);

  if (loading) {
    return (
      <div className="text-gray-500 text-center py-10">
        Loading...
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-gray-500 text-center py-10">
        No bookings found.
      </div>
    );
  }

const handledelete = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/mybookins/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.deletedCount > 0) {
      const remaining = bookings.filter(
        (booking) => booking._id !== id
      );
      toast.success("Cancel SeBooking cancelled")
      setBookings(remaining);
    }

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-1 gap-6 max-w-7xl">
      {bookings.map((booking) => (
        <div
          key={booking._id || booking.id}
          className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-6 font-sans"
        >
          {/* Left Side: Image Container */}
          <div className="w-full md:w-[210px] h-[210px] bg-[#e5e5e0] rounded-xl p-3 flex items-center justify-center flex-shrink-0">
            <Image
              src={
                booking.imageUrl ||
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=500"
              }
              alt={booking.roomName}
              width={200}
              height={200}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Right Side: Content Details */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Top Badges */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 bg-[#ebf7ed] text-[#2e7d32] text-xs font-semibold px-3 py-1 rounded-full border border-[#c8e6c9]">
                <span className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full"></span>
                {booking.status || "Confirmed"}
              </div>

              <span className="text-gray-500 text-xs font-medium tracking-wide">
                ID: {booking.bookingId || "SN-49210"}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[#0b2545] text-2xl font-bold font-serif mb-3">
              {booking.roomName || "The Alcott Reading Suite"}
            </h2>

            {/* Date and Time Info */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm font-medium mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-gray-500" />
                <span>{booking.date || "Oct 24, 2024"}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-gray-500" />
                <span>{booking.startTime || "09:00 AM"}</span>
                <span>to</span>
                <span>{booking.endTime || "12:00 PM"}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-gray-600 text-sm font-medium mb-6">
              <MapPin size={16} className="text-gray-500" />
              <span>{booking.location || "North Wing, Floor 3"}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-auto">
              <button
                onClick={() => handledelete(booking._id)}
                className="px-6 py-2.5 text-sm font-semibold text-black bg-white border border-black rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel 
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}