"use client";

import React from "react";

export default function GenericBookingForm({ room }) {
  // প্রপ্স থেকে রুমের তথ্যগুলো নেওয়া হচ্ছে
  const { _id, roomName, imageUrl, floor } = room || {};

  const submitdata = async (e) => {
    e.preventDefault();

    // ১. ফর্ম থেকে ডেট ও টাইম নেওয়া
    const formData = new FormData(e.currentTarget);
    const formFields = Object.fromEntries(formData.entries());

    // ২. ফর্মের ডেটার সাথে প্রপ্স থেকে আসা রুমের ডেটা যুক্ত করা (Payload তৈরি)
    const finalBookingData = {
      ...formFields,                 // ডেট, টাইম, বুকিং আইডি, স্ট্যাটাস ইত্যাদি
      roomId: _id,                  // প্রপ্স থেকে আইডি
      roomName: roomName,           // প্রপ্স থেকে নাম
      imageUrl: imageUrl,           // প্রপ্স থেকে ইমেজ ইউআরএল
    };

    console.log("ডাটাবেজে পাঠানোর জন্য রেডি পেলোড:", finalBookingData);

    try {
      const response = await fetch("http://localhost:5000/mybookins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalBookingData), // পুরো অবজেক্ট একসাথে পাঠানো হচ্ছে
      });

      if (response.ok) {
        const result = await response.json();
        console.log("সার্ভার রেসপন্স:", result);
        alert("ইমেজ ইউআরএল সহ সব ডেটা সফলভাবে ডাটাবেজে সেভ হয়েছে ভাই! 🎉");
        e.target.reset(); // ফর্ম রিলেট/রিসেট করার জন্য
      } else {
        alert("সার্ভারে ডেটা পাঠাতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ব্যাকএন্ড সার্ভার কানেক্ট হতে পারছে না।");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6 min-h-screen">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
        
        {/* ফর্ম হেডার ও রুমের কার্ড প্রিভিউ */}
        <div className="border-b border-gray-100 pb-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Confirm Your Booking</h2>
          
          {/* রুমের ছবি ও নাম যেটা প্রপ্স থেকে আসছে (ইউজারকে দেখানোর জন্য) */}
          <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl mt-2 border border-gray-100">
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={roomName} 
                className="w-16 h-16 object-cover rounded-lg border border-gray-200" 
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
          
          {/* বুকিং আইডি এবং স্ট্যাটাস (এগুলো আপনার আগের মতো রাখা হলো) */}
          <div className="grid grid-cols-2 gap-4">
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

          {/* লোকেশন / ফ্লোর */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Location / Notes</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. North Wing"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-600 outline-none"
            />
          </div>

          {/* তারিখ */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Booking Date</label>
            <input
              type="date"
              name="date"
              required
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-600 outline-none"
            />
          </div>

          {/* সময় (শুরু ও শেষ) */}
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

          {/* সাবমিট বাটন */}
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