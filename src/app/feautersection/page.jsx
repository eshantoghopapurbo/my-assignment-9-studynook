
import AllRoomsCard from '@/components/AllRoomsCard';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';


 const FeautersSection = async() => {
    const res =await fetch (`http://localhost:5000/feautersection`)
    const rooms =await res.json();
    return (
        <div className='container mx-auto '>
         <div className='px-4 md:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-8'>
            <div>
             <h1 className='text-xl font-bold'>Latest Available Rooms</h1>
          <p className='text-md font-bold text-gray-500'>Hand-picked spaces for high-efficiency study sessions.</p>
         </div>
            
         
            <div>
               <Link href={"/rooms"}> <Button variant="outline" className='border-1 text-md rounded-none hover:bg-blue-400'>  <GoArrowRight />View All Rooms</Button></Link>
            </div>
        
         </div>
           <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                rooms.map(room => <AllRoomsCard key={room._id} room={room} />)
            }
           </div>

        </div>
    );
};

export default FeautersSection;