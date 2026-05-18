"use client";

import React, { useState } from "react";

export default function LibraryBooking() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  
  // State for modal inputs (TypeScript types removed)
  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "09:00",
    endTime: "12:00",
    hourlyRate: 45,
    serviceCharge: 12,
  });

  // Calculate hours dynamically based on start and end time
  const calculateHours = (start, end) => {
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);
    
    const startTimeInMinutes = startHours * 60 + startMinutes;
    const endTimeInMinutes = endHours * 60 + endMinutes;
    
    const durationInMinutes = endTimeInMinutes - startTimeInMinutes;
    return durationInMinutes > 0 ? parseFloat((durationInMinutes / 60).toFixed(1)) : 0;
  };

  const totalHours = calculateHours(bookingData.startTime, bookingData.endTime);
  const totalRoomPrice = totalHours * bookingData.hourlyRate;
  const grandTotal = totalRoomPrice > 0 ? totalRoomPrice + bookingData.serviceCharge : 0;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!bookingData.date) {
      alert("Please select a date.");
      return;
    }
    if (totalHours <= 0) {
      alert("End time must be after start time.");
      return;
    }
    
    setBookingConfirmed(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setBookingConfirmed(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      
      {/* 1. Main Library Room Card Component */}
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 transition-all hover:shadow-xl">
        <div className="relative h-48 bg-gradient-to-tr from-emerald-600 to-teal-400 p-6 flex flex-col justify-end text-white">
          <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
            Floor 3
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Silent Study Suite</h2>
          <p className="text-emerald-50 text-sm mt-1">Premium Collaborative Space</p>
        </div>
        
        <div className="p-6">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <span className="text-3xl font-extrabold text-gray-900">£{bookingData.hourlyRate}</span>
              <span className="text-gray-500 text-sm font-medium"> / hour</span>
            </div>
            <div className="flex items-center text-sm font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              ★ 4.9
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-emerald-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md hover:bg-emerald-700 transition duration-200 active:scale-[0.98]"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* 2. Interactive Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 animate-slideUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Configure Booking</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                ✕
              </button>
            </div>

            {bookingConfirmed ? (
              /* Success Confirmation View */
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4 animate-scaleUp">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-gray-900">Booking Confirmed!</h4>
                <p className="text-sm text-gray-500 mt-1">Your space has been reserved successfully.</p>
              </div>
            ) : (
              /* Setup Form View */
              <form onSubmit={handleConfirmBooking} className="space-y-5">
                
                {/* Date Picker Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 bg-gray-50"
                  />
                </div>

                {/* Time Selection Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      From
                    </label>
                    <input
                      type="time"
                      value={bookingData.startTime}
                      onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Until
                    </label>
                    <input
                      type="time"
                      value={bookingData.endTime}
                      onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 bg-gray-50"
                    />
                  </div>
                </div>

                <hr className="border-gray-100 my-2" />

                {/* Dynamic Price Breakdown Engine */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>£{bookingData.hourlyRate} × {totalHours} hours</span>
                    <span>£{totalRoomPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Service Charge</span>
                    <span>£{bookingData.serviceCharge}</span>
                  </div>
                  
                  <div className="flex justify-between items-baseline pt-3 border-t border-dashed border-gray-200">
                    <span className="text-base font-bold text-gray-900">Total Price</span>
                    <span className="text-2xl font-black text-gray-900">£{grandTotal}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={totalHours <= 0}
                    className="w-full bg-orange-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Booking
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    You won't be charged extra processing fees.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}