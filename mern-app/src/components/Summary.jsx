import React from "react";
// import "remixicon/fonts/remixicon.css";

export default function Summary({ displays, offers, duration, hours, locations }) {
  const total = Object.values(offers).reduce((sum, v) => sum + Number(v || 0), 0);

  return (
    <div className="bg-[#232b3b] rounded-xl p-6 mb-6">
      <div className="text-2xl font-bold text-white mb-4">Summary</div>
      <div className="flex gap-6 mb-6">
        <div className="flex-1 bg-[#26304a] rounded-lg p-6 flex flex-col items-center">
          <div className="text-xs text-gray-400 mb-1">Displays</div>
          <div className="text-3xl font-bold text-white">{String(displays.length).padStart(2, '0')}</div>
        </div>
        <div className="flex-1 bg-[#26304a] rounded-lg p-6 flex flex-col items-center">
          <div className="text-xs text-gray-400 mb-1">Locations</div>
          <div className="text-3xl font-bold text-white">{String(locations).padStart(2, '0')}</div>
        </div>
        <div className="flex-1 bg-[#26304a] rounded-lg p-6 flex flex-col items-center">
          <div className="text-xs text-gray-400 mb-1">Duration</div>
          <div className="text-3xl font-bold text-white">{duration}</div>
        </div>
        <div className="flex-1 bg-[#26304a] rounded-lg p-6 flex flex-col items-center">
          <div className="text-xs text-gray-400 mb-1">Hours</div>
          <div className="text-3xl font-bold text-white">{hours}</div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400">Fixed</span>
        <span className="text-xs text-[#ffb347] font-semibold">Chooses Fixed Offer for the Campaign</span>
      </div>
      <div className="flex gap-6">
        {displays.map((d, i) => (
          <div key={d._id} className="flex-1 bg-[#26304a] rounded-lg p-6 flex flex-col items-center">
            <div className="text-xs text-gray-400 mb-1">Display #{i+1}</div>
            <div className="text-3xl font-bold text-white">${offers[d._id] || 0}</div>
          </div>
        ))}
      </div>
      
      {/* Campaign Total row */}
      <div className="bg-[#26304a] rounded-lg p-4 flex items-center justify-between mt-6">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-white">Campaign Total</span>
          <div className="flex items-center gap-2 mt-1">
            <i className="ri-information-line text-xl text-[#ffb347]" />
            <span className="text-xs text-gray-300">Total Estimated Budget of the Campaign</span>
          </div>
        </div>
        <span className="text-3xl font-bold text-white">${total.toLocaleString()}</span>
      </div>
    </div>
  );
} 