import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative  py-16 px-4 sm:px-6 lg:px-8 min-h-[600px] flex items-center overflow-hidden">
      <div className="container mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 space-y-6 text-left z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#002855] tracking-tight leading-tight">
            Find Your Perfect Study Room
          </h1>
          
          <p className="text-base sm:text-lg text-[#4a5568] max-w-xl leading-relaxed">
            Browse and book quiet, private study rooms in your library. List your own room and earn while helping fellow scholars succeed.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            {/* Explore Rooms Button */}
            <Link 
              href="/rooms" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-[#002147] hover:bg-[#001530] transition duration-300 ease-in-out shadow-sm"
            >
              Explore Rooms
            </Link>
            
            {/* How it Works Button */}
            <Link 
              href="#how-it-works" 
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#10b981] text-base font-semibold rounded-md text-[#047857] bg-white hover:bg-[#f0fdf4] transition duration-300 ease-in-out shadow-sm"
            >
              How it Works
            </Link>
          </div>
        </div>

        {/* Right Image Column with Live Status Badge */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end w-full">
          <div className="relative w-full max-w-[550px] aspect-[4/3] sm:aspect-video lg:aspect-[4/3]">
            
            {/* Premium Quality Image Wrapper */}
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-[#1e293b] relative">
              <Image 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
                alt="Modern Study Room with Glass Walls" 
                fill
                priority
                className="object-cover transform hover:scale-105 transition duration-700 ease-in-out"
                sizes="(max-w-7xl) 50vw, 100vw"
              />
            </div>
            
            {/* Premium Live Status Badge */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 max-w-[220px] transform transition hover:-translate-y-1 duration-300 z-20">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-bold text-gray-800">42 Rooms Available</span>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-normal">
                Live updates from 12 library wings.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}