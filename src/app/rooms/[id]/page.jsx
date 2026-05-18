import Image from "next/image";


const RoomDetailesPage =async ({params}) => {
    const {id} = await params;
    
    const res = await fetch (`http://localhost:5000/rooms/${id}`)
    const room = await res.json()
    console.log(room);
     const { _id, roomName, description, imageUrl, floor, capacity, hourlyRate,amenities } = room;

    return (
       <div>
         <div className="container mx-auto mt-10">
          <Image src={imageUrl} 
          alt="roomName"
          width={800}
          height={800}
          ></Image>
        </div>

           <div className="p-6 flex-1 flex flex-col justify-between container mx-auto">
                <div>
                    {/* Title & Credits */}
                    <div className="flex  items-start gap-130 mb-2">
                        <h3 className="text-xl font-bold text-[#0A2540] tracking-tight leading-snug">
                            {roomName}
                        </h3>
                        <span className="text-sm font-bold text-teal-600 whitespace-nowrap pt-0.5">
                            {capacity} Credits/hr
                        </span>
                    </div>

                    {/* Meta Info (Level/Zone & Capacity) */}
                    <div className="text-xl text-slate-500 font-medium mb-2">
                        {description} • Capacity: {capacity} {capacity > 1 ? 'Persons' : 'Person'}
                    </div>

                    {/* Dynamic Amenities Tags */}
                    <div className="flex items-center gap-140 mb-4">
                      <p className='text-xl text-slate-500 '>{floor}</p>
                       <p className='font-bold text-xl '>${hourlyRate}</p>
                    </div>

                    <div className="flex flex-wrap gap-8 mb-5">
                        {amenities && amenities.length > 0 ? (
                            amenities.map((amenity, index) => (
                                <span 
                                    key={index} 
                                    className="text-xs font-medium bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200"
                                >
                                    {amenity}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-slate-400 italic">No amenities available</span>
                        )}
                    </div>
                   
                </div>
       </div>
       </div>
        
    );
};

export default RoomDetailesPage;