import LibraryBooking from "@/components/BookNowDesigns";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";

const RoomDetailesPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`)
    const room = await res.json()
       console.log(room)
    const { _id, roomName, description, imageUrl, floor, capacity, hourlyRate, amenities } = room;
    return (
        <div>
            {/* Top Section: Image and Booking Card */}
            <div className="flex flex-col lg:flex-row container mx-auto items-center lg:items-start justify-between gap-8 px-4 md:px-6 md:mt-10">
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
                            height={800}
                            priority
                        />
                    </div>
                </div>

                {/* Right Side: Booking Component */}
                <div className="w-full lg:w-auto min-w-[300px] sm:min-w-[350px] lg:max-w-[600px] lg:mt-15">
                    <LibraryBooking room={room} />
                </div>
            </div>

           
            {/* Bottom Section: Room Details */}
    <div className="container mx-auto max-w-4xl  md:py-10 ml-30">
    <div className="flex flex-col gap-6 md:gap-8 p-5 md:p-8">
        {/* Title & Credits */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 ">
            <h3 className="text-xl md:text-3xl font-extrabold text-[#0A2540] tracking-tight">
                {roomName}
            </h3>
            <span className="text-sm md:text-base font-bold text-teal-700 bg-teal-50 px-4 py-1.5 rounded-full w-fit border border-teal-100 shadow-sm whitespace-nowrap">
                {capacity} Credits/hr
            </span>
        </div>

        {/* Description & Capacity */}
        <div className="space-y-3">
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-normal">
                {description}
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-700 text-sm px-3 py-1 rounded-lg font-semibold border border-slate-150">
                <span>Capacity:</span>
                <span className="text-blue-600">{capacity} {capacity > 1 ? 'Persons' : 'Person'}</span>
            </div>
        </div>

        {/* Floor & Hourly Rate Cards */}
        <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6 bg-slate-50 p-4 rounded-xl w-full sm:w-fit border border-slate-100">
            <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Floor</span>
                <p className="text-base md:text-lg font-bold text-slate-800">{floor || "N/A"}</p>
            </div>
            
            <div className="hidden sm:block h-8 w-[1px] bg-slate-200"></div> {/* Vertical Divider for desktop */}
            
            <div className="space-y-1 border-l pl-4 sm:border-l-0 sm:pl-0 border-slate-200">
                <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Hourly Rate</span>
                <p className="text-lg md:text-xl font-extrabold text-blue-600">${hourlyRate}</p>
            </div>
        </div>

        {/* Dynamic Amenities Tags */}
        <div className="border-t border-slate-100 pt-5">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Amenities</h4>
            <div className="flex flex-wrap gap-2 md:gap-3">
                {amenities && amenities.length > 0 ? (
                    amenities.map((amenity, index) => (
                        <span
                            key={index}
                            className="text-xs md:text-sm font-medium bg-white text-slate-700 px-3 py-2 rounded-lg border border-slate-200 shadow-sm transition hover:bg-slate-50 hover:border-slate-350 cursor-default"
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