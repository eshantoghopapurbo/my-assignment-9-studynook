
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

const AllRoomsCard = ({ room }) => {
    const { _id, roomName, description, imageUrl, floor, capacity, hourlyRate, amenities } = room;
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 w-full max-w-[480px]">

            <div className="relative w-full h-[240px] overflow-hidden rounded-t-xl">
                <Image
                    src={imageUrl}
                    alt={roomName}
                    fill // 👈 Eta use korle image automatic parent div er soman hobe
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 👈 Sothik resolution load korar jonno
                    style={{ objectFit: 'cover' }} // 👈 Image stretch na hoye perfect bhabe fit hobe
                    className="select-none transition-transform duration-300 hover:scale-105"
                />
            </div>
            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    {/* Title & Credits */}
                    <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="text-xl font-bold text-[#0A2540] tracking-tight leading-snug">
                            {roomName}
                        </h3>
                        <span className="text-sm font-bold text-teal-600 whitespace-nowrap pt-0.5">
                            {capacity} Credits/hr
                        </span>
                    </div>

                    {/* Meta Info (Level/Zone & Capacity) */}
                    <div className="text-sm text-slate-500 font-medium mb-2">
                        {description} • Capacity: {capacity} {capacity > 1 ? 'Persons' : 'Person'}
                    </div>

                    {/* Dynamic Amenities Tags */}
                    <div className="flex items-center justify-between mb-4">
                        <p className='text-sm text-slate-500'>{floor}</p>
                        <p className='font-bold text-xl'>${hourlyRate}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {amenities && amenities.length > 0 ? (
                            amenities.map((amenity, index) => (
                                <span
                                    key={index}
                                    className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
                                >
                                    {amenity}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-slate-400 italic">No amenities available</span>
                        )}
                    </div>

                </div>

                {/* Dynamic Premium Button based on Status */}
                <div>
                    <Link href={`/rooms/${_id}`}><Button className="w-full bg-[#0A2540] hover:bg-[#071d33] text-white text-sm font-bold py-3.5 px-4 rounded-md transition-colors duration-200 shadow-sm">
                        View Detailes
                    </Button> </Link>
                </div>
            </div>

        </div>
    );
};

export default AllRoomsCard;