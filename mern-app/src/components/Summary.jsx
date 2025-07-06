import React from "react";
// import "remixicon/fonts/remixicon.css";

export default function Summary({ displays, offers, duration, hours, locations }) {
  const total = Object.values(offers).reduce((sum, v) => sum + Number(v || 0), 0);

  return (
    <>
    <div className="bg-[#303744] rounded-2xl p-8 mb-6">
      <div className="text-3xl font-extrabold text-white mb-8">Summary</div>
      <div className="flex gap-8 mb-10">
        <div className="flex-1 bg-[#353b48] rounded-xl p-8 flex flex-col items-center">
          <div className="text-xl font-extrabold text-white mb-2">Displays</div>
          <div className="text-4xl font-extrabold text-white">{String(displays.length).padStart(1, '0')}</div>
        </div>
        <div className="flex-1 bg-[#353b48] rounded-xl p-8 flex flex-col items-center">
          <div className="text-xl font-extrabold text-white mb-2">Locations</div>
          <div className="text-4xl font-extrabold text-white">{String(locations).padStart(1, '0')}</div>
        </div>
        <div className="flex-1 bg-[#353b48] rounded-xl p-8 flex flex-col items-center">
          <div className="text-xl font-extrabold text-white mb-2">Duration</div>
          <div className="text-4xl font-extrabold text-white">{duration}</div>
        </div>
        <div className="flex-1 bg-[#353b48] rounded-xl p-8 flex flex-col items-center">
          <div className="text-xl font-extrabold text-white mb-2">Hours</div>
          <div className="text-4xl font-extrabold text-white">{hours}</div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <span className="text-2xl font-extrabold text-[#b2b6be] opacity-60">Bidding</span>
        <span className="text-lg font-bold text-[#a86a3d]">Chooses Bidding Rate Offer for the Campaign</span>
      </div>
    </div>
  


      {/* Campaign Total row */}

      <div className="bg-[#303744] rounded-xl p-6 mb-6">
        <div className="bg-[#272F3F] rounded-lg p-4 flex items-center justify-between mt-6">
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-white mb-8">Campaign Total</span>
            <div className="flex items-center gap-2 mt-1">
              <i className="ri-information-line text-3xl text-[#ffb347]" />
              <span className="text-lg font-bold text-gray-300">Total Estimated Budget of the Campaign</span>
            </div>
          </div>
          <span className="text-3xl font-bold text-white">${total.toLocaleString()}</span>
        </div>
      </div>
    </>
  );
} 