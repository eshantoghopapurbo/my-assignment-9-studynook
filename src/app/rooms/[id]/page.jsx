import LibraryBooking from "@/components/BookNowDesigns";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";

const RoomDetailesPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/rooms/${id}`)
    const room = await res.json()
    const { _id, roomName, description, imageUrl, floor, capacity, hourlyRate, amenities } = room;
    return (
     <div>
    {/* Top Section: Image and Booking Card */}
    <div className="flex flex-col lg:flex-row container mx-auto items-center lg:items-start justify-between gap-8 px-4 md:px-6 mt-6 md:mt-10">
        {/* Left Side: Edit Button & Image */}
        <div className="w-full lg:w-auto flex flex-col items-end lg:items-end">
            <div className="mr-4 flex gap-4">
                <EditModal room={room} />
                <DeleteAlert room={room}  ></DeleteAlert>
            </div>
            <div className="w-full max-w-[800px] overflow-hidden rounded-md">
                <Image 
                    src={imageUrl}
                    alt={roomName || "Room Image"}
                    className="rounded-md object-cover w-full h-auto aspect-video lg:aspect-auto"
                    width={800}
                    height={400}
                    priority
                />
            </div>
        </div>

        {/* Right Side: Booking Component */}
        <div className="w-full lg:w-auto min-w-[300px] sm:min-w-[350px] lg:max-w-[600px] lg:mt-30">
            <LibraryBooking room={room} />
        </div>
    </div>

    {/* Bottom Section: Room Details */}
    <div className="p-4 md:p-6 flex-1 flex flex-col justify-between container mx-auto mb-12 md:mb-20">
        <div className="space-y-4">
            
            {/* Title & Credits */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-20 border-b border-slate-100 pb-3">
                <h3 className="text-xl md:text-2xl font-bold text-[#0A2540] tracking-tight leading-snug">
                    {roomName}
                </h3>
                <span className="text-sm md:text-base font-bold text-teal-600 whitespace-nowrap bg-teal-50 px-3 py-1 rounded-full w-fit">
                    {capacity} Credits/hr
                </span>
            </div>

            {/* Meta Info (Description & Capacity) */}
            <div className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                {description} • <span className="inline-block bg-slate-100 text-slate-700 text-sm px-2 py-0.5 rounded-md font-semibold">Capacity: {capacity} {capacity > 1 ? 'Persons' : 'Person'}</span>
            </div>

            {/* Floor & Hourly Rate */}
            <div className="flex items-center gap-6 text-slate-700 bg-slate-50 p-3 rounded-xl w-fit">
                <div>
                    <span className="text-xs text-slate-400 block font-normal uppercase">Floor</span>
                    <p className='text-lg md:text-xl font-semibold'>{floor || "N/A"}</p>
                </div>
                <div className="h-8 w-[1px] bg-slate-200"></div> {/* Divider */}
                <div>
                    <span className="text-xs text-slate-400 block font-normal uppercase">Hourly Rate</span>
                    <p className='font-bold text-lg md:text-xl text-blue-600'>${hourlyRate}</p>
                </div>
            </div>

            {/* Dynamic Amenities Tags */}
            <div className="pt-2">
                <h4 className="text-sm font-semibold text-slate-600 mb-3">Amenities:</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {amenities && amenities.length > 0 ? (
                        amenities.map((amenity, index) => (
                            <span
                                key={index}
                                className="text-xs md:text-sm font-medium bg-white text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition hover:border-slate-300"
                            >
                                {amenity}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-slate-400 italic">No amenities available</span>
                    )}
                </div>
            </div>

        </div>
    </div>
</div>
    );
};

export default RoomDetailesPage;