import React from "react";
// import "remixicon/fonts/remixicon.css";
// import axios from "axios";

export default function FixedOffer({ sameRate, setSameRate }) {
  return (
    <div className="bg-[#303744] rounded-2xl p-8 mb-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-3xl font-extrabold text-white">Bid Rate</span>
        <div className="flex items-center gap-3">
          <span className="text-xl text-gray-200 font-semibold mr-2">Choose same file for same Layouts?</span>
          <button
            type="button"
            className={`w-10 h-6 flex items-center rounded-full border-2 border-[] ${sameRate ? 'bg-[#22c55e]' : 'bg-transparent'}`}
            onClick={() => setSameRate(v => !v)}
            aria-label="Toggle same file for same layouts"
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${sameRate ? 'translate-x-5' : ''}`}
            />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <i className="ri-error-warning-line text-[#ffb347] text-3xl mr-2" />
        <span className="text-mediam text-white font-bold">
          Enter the minimum and maximum amount you're willing to bid per hour. Your ad will run only during the hours where your bid wins. At the end of each cycle, you'll be charged for the total number of hours your ad successfully ran.
        </span>
      </div>
    </div>
  );
} 