
"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddRoomForm() {

  const { data } = authClient.useSession();
 const user = data?.user;
console.log("user data console ",user);

const [formData, setFormData] = useState({
  roomName: "",
  description: "",
  imageUrl: "",
  floor: "",
  capacity: "",
  hourlyRate: "",
  amenities: [],
});

  const amenityOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];



  // Handle text, number, and textarea inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes (Array of strings)
  const handleCheckboxChange = (amenity) => {
    setFormData((prev) => {
      const isSelected = prev.amenities.includes(amenity);
      const updatedAmenities = isSelected
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updatedAmenities };
    });
  };

 const onSubmit = async (e) => {
  e.preventDefault();

  // login user + form data merge
  const roomData = {
    ...formData,
    name: user?.name || "",
    email: user?.email || "",
    capacity: Number(formData.capacity),
    hourlyRate: Number(formData.hourlyRate),
  };

  console.log("Submitting:", roomData);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addroom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    const data = await res.json();

    if (data?.insertedId) {
      toast.success("Room added successfully 🎉");

      setFormData({
        roomName: "",
        description: "",
        imageUrl: "",
        floor: "",
        capacity: "",
        hourlyRate: "",
        amenities: [],
      });

    } else {
      toast.error("Room failed to add!");
    }

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong with server!");
  }
};




  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            List a New Room
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Configure your study space specifications for the academic community.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={onSubmit} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Room Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="roomName"
                required
                value={formData.roomName}
                onChange={handleChange}
                placeholder="e.g., The Turing Suite"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the atmosphere, equipment, and unique features..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200 resize-none"
              />
            </div>

            {/* Amenities Section */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Available Amenities
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenityOptions.map((amenity) => {
                  const isChecked = formData.amenities.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      className={`flex items-center p-4 border rounded-xl cursor-pointer select-none transition duration-200 ${
                        isChecked
                          ? "border-blue-600 bg-blue-50/50 text-blue-900 font-medium"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(amenity)}
                        className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mr-3 animate-none"
                      />
                      {amenity}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Meta Details & Image */}
          <div className="space-y-6 lg:border-l lg:border-slate-100 lg:pl-8">
            
            {/* Image Preview & URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Room Image
              </label>
              <div className="aspect-video w-full rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center overflow-hidden mb-3 relative group">
                {formData.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={formData.imageUrl}
                    alt="Room Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                ) : (
                  <div className="text-center p-4">
                    <p className="text-xs text-slate-400">Image Preview will appear here</p>
                  </div>
                )}
              </div>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200"
              />
            </div>

            {/* Floor Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Floor Number
              </label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder="e.g., 2nd Floor"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200"
              />
            </div>

            {/* Capacity & Hourly Rate */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="4"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  min="0"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="15.00"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                className="w-full py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-medium rounded-xl shadow-sm transition duration-200 active:scale-[0.99]"
              >
                Add Room
              </button>
              <button
                type="button"
                onClick={() => setFormData({ roomName: "", description: "", imageUrl: "", floor: "", capacity: "", hourlyRate: "", amenities: [] })}
                className="w-full py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}