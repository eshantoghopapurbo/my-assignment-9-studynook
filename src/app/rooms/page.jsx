
"use client";

import AllRoomsCard from '@/components/AllRoomsCard';
import React, { useState, useEffect } from 'react';

const AllRoomsPage = () => {
    const filterAmenities = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "AC"];

    // States for data and filters
    const [allRooms, setAllRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. API theke data load kora
    useEffect(() => {
        fetch("http://localhost:5000/rooms")
            .then(res => res.json())
            .then(data => {
                setAllRooms(data);
                setFilteredRooms(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching rooms:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let tempRooms = [...allRooms];

        // A. Search Filter Logic (Room name onujayi)
        if (searchQuery.trim() !== "") {
            tempRooms = tempRooms.filter(room =>
                room.roomName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // B. Amenities Checkbox Filter Logic
        if (selectedAmenities.length > 0) {
            tempRooms = tempRooms.filter(room =>
                // Check korbe selected sob amenities oi room-er bhetor ache কিনা
                selectedAmenities.every(amenity => room.amenities?.includes(amenity))
            );
        }

        setFilteredRooms(tempRooms);
    }, [searchQuery, selectedAmenities, allRooms])

    // Checkbox click handle korar function
    const handleAmenityChange = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    // Clear All Filters
    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedAmenities([]);
    };

    if (loading) {
        return <div className="text-center py-20 font-bold text-[#0A2540]">Loading Rooms...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 bg-[#F8FAFC] min-h-screen font-sans">

            {/* Top Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-[#0A2540] tracking-tight mb-2">Available Study Rooms</h1>
                <p className="text-slate-500 text-base">Find the perfect space for deep focus or academic collaboration.</p>
            </div>

            {/* Main Content Layout Container */}
            <div className="flex flex-col lg:flex-row gap-8">

                {/* ================= LEFT SIDEBAR FILTER ================= */}
                <div className="w-full lg:w-[280px] bg-white p-6 rounded-xl border border-slate-200 h-fit shadow-sm shrink-0">
                    <h2 className="text-lg font-bold text-[#0A2540] mb-5">Filters</h2>

                    {/* Search Input */}
                    <div className="mb-6">
                        <label className="text-xs font-bold text-slate-600 block mb-2 tracking-wide uppercase">Search Rooms</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // 👈 Connect with State
                                placeholder="Room name..."
                                className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder-slate-400 text-slate-700"
                            />
                        </div>
                    </div>

                    {/* Amenities Checkboxes */}
                    <div className="mb-6">
                        <label className="text-xs font-bold text-slate-600 block mb-3 tracking-wide uppercase">Amenities</label>
                        <div className="space-y-3.5">
                            {filterAmenities.map((amenity, index) => (
                                <label key={index} className="flex items-center text-sm font-medium text-slate-600 cursor-pointer select-none group">
                                    <input
                                        type="checkbox"
                                        checked={selectedAmenities.includes(amenity)}
                                        onChange={() => handleAmenityChange(amenity)} // 👈 Connect with Function
                                        className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500/30 accent-[#0F766E] cursor-pointer"
                                    />
                                    <span className="ml-3 group-hover:text-slate-900 transition-colors">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Clear Button */}
                    <button
                        onClick={handleClearFilters} // 👈 Connect with Function
                        className="w-full py-2.5 px-4 border-2 border-[#0F766E] text-[#0F766E] text-sm font-bold rounded-lg hover:bg-teal-50/50 transition-colors duration-200"
                    >
                        Clear All Filters
                    </button>
                </div>

                {/* ================= RIGHT SIDE - ALL ROOMS CARD GRID ================= */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-[#0A2540]">
                            All Rooms ({filteredRooms.length})
                        </h2>
                    </div>

                    {/* Jodi search result faka hoy */}
                    {filteredRooms.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-xl">
                            <p className="text-slate-400 text-lg font-medium">No rooms found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                            {filteredRooms.map(room => (
                                <AllRoomsCard key={room._id} room={room} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AllRoomsPage;