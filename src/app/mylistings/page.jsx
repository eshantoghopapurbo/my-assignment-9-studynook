import AllRoomsCard from "@/components/AllRoomsCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from '@heroui/react';
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';
import { IoAddOutline } from "react-icons/io5";


const MyListings  =async () => {
    const session = await auth.api.getSession({
    headers: await headers()
  });
  const user =session?.user
    const res =await fetch (`http://localhost:5000/mylisting?email=${user.email}`)
    const mylistings =await res.json();
    return (
         <div className="container mx-auto mt-10 ">
           <div className="flex justify-between items-center">
             <div>
                <h1 className='text-2xl font-bold '>My Listings</h1>
            <p className="text-xl text-gray-500">Manage your academic study spaces and availability.</p>
             </div>
                <div>
               <Link href={"/addroom"}> <Button variant="outline" className='border-1 mr-10 text-xl rounded-none hover:bg-blue-400'>  <IoAddOutline  /> Add New Room</Button></Link>
            </div>
           </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {
                    mylistings.map((room,index) =><AllRoomsCard key={index} room={room}/>)
                }
            </div>
        </div>
    );
};
export default MyListings;


