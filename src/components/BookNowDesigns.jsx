"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

export default function GenericBookingForm({ room }) {
  
  const { _id, roomName, imageUrl, floor } = room || {};
      const { data } = authClient.useSession();
    const user = data?.user;

  const submitdata = async (e) => {
    e.preventDefault();

    
    const formData = new FormData(e.currentTarget);
    const formFields = Object.fromEntries(formData.entries());
    const finalBookingData = {
      ...formFields,                 
      roomId: _id,                 
      roomName: roomName,          
      imageUrl: imageUrl,
      email : user?.email,
      name : user?.name
    }

    

    try {
      const response = await fetch("${process.env.NEXT_PUBLIC_SERVER_URL}/mybookins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalBookingData), 
      });

      if (response.ok) {
        const result = await response.json();
        console.log( result);
        toast.success("Books added successfully 🎉");
        e.target.reset(); 
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
     
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl p-6  border">
        
        <div className="border-b border-gray-100 pb-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Confirm Your Booking</h2>
          
          <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl mt-2 border border-gray-100">
            {imageUrl && (
              <Image 
                src={imageUrl} 
                alt={roomName} 
                width={100}
                height={100}
                // className="w-16 h-16 object-cover rounded-lg border border-gray-200" 
              />
            )}
            <div>
              <h3 className="font-bold text-gray-700">{roomName || "No Room Selected"}</h3>
              <p className="text-xs text-gray-400">Floor: {floor || "N/A"} | ID: {_id}</p>
            </div>
          </div>
        </div>

        {/* মেইন ফর্ম */}
        <form onSubmit={submitdata} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Booking ID</label>
              <input
                type="text"
                name="bookingId"
                placeholder="SN-49210"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Status</label>
              <input
                type="text"
                name="status"
                placeholder="Confirmed"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-600 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Location / Notes</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. North Wing"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-600 outline-none"
            />
          </div>

      
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Booking Date</label>
            <input
              type="date"
              name="date"
              required
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-600 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Start Time (From)</label>
              <input
                type="time"
                name="startTime"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">End Time (Until)</label>
              <input
                type="time"
                name="endTime"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-600 outline-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition duration-200"
            >
              Confirm & Save Booking
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}