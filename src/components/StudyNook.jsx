import React from 'react';
// Lucide icons (Install via: npm install lucide-react)
import { Sparkles, ShieldCheck, Users } from 'lucide-react';

export default function StudyNook() {
  return (
    <section className=" py-16 px-4 md:py-24 text-center mb-5">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Heading & Subtitle */}
        <div className="mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0c2340] mb-4">
            Why StudyNook?
          </h2>
          <p className="text-sm md:text-base text-[#5c6f84] leading-relaxed">
            Designed by students, for students. We provide the tools you need to find peace and productivity on campus.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 px-4 md:px-0">
          
          {/* Feature 1: Quiet Spaces */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#112e51] rounded-2xl flex items-center justify-center mb-5 shadow-sm">
              <Sparkles className="w-6 h-6 text-[#8ba3c7]" />
            </div>
            <h3 className="text-lg font-bold text-[#0c2340] mb-3">
              Quiet Spaces
            </h3>
            <p className="text-xs md:text-sm text-[#5c6f84] max-w-xs leading-relaxed">
              Every room is vetted for sound levels to ensure you can reach a state of flow without distractions.
            </p>
          </div>

          {/* Feature 2: Secure Booking */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#112e51] rounded-2xl flex items-center justify-center mb-5 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-[#8ba3c7]" />
            </div>
            <h3 className="text-lg font-bold text-[#0c2340] mb-3">
              Secure Booking
            </h3>
            <p className="text-xs md:text-sm text-[#5c6f84] max-w-xs leading-relaxed">
              Instant confirmation and secure digital keys for your reserved time slots. No more seat-hunting.
            </p>
          </div>

          {/* Feature 3: Community Driven */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#112e51] rounded-2xl flex items-center justify-center mb-5 shadow-sm">
              <Users className="w-6 h-6 text-[#8ba3c7]" />
            </div>
            <h3 className="text-lg font-bold text-[#0c2340] mb-3">
              Community Driven
            </h3>
            <p className="text-xs md:text-sm text-[#5c6f84] max-w-xs leading-relaxed">
              Peer-to-peer sharing ecosystem that makes campus resources more accessible and profitable for everyone.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}