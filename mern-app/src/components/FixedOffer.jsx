import React from "react";
// import "remixicon/fonts/remixicon.css";
import axios from "axios";

export default function FixedOffer({ displays, offers, setOffers, sameRate, setSameRate }) {
  const handleOfferChange = (id, value) => {
    if (sameRate) {
      const newOffers = {};
      displays.forEach(d => { newOffers[d._id] = value; });
      setOffers(newOffers);
    } else {
      setOffers(o => ({ ...o, [id]: value }));
    }
  };

  const handleCreateCampaign = async (campaignData) => {
    try {
      const res = await axios.post("/api/campaigns", campaignData);
      console.log("Campaign created:", res.data);
    } catch (err) {
      console.error("Create campaign failed:", err);
    }
  };

  return (
    <div className="bg-[#232b3b] rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-white">Fixed Offer</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-200 mr-2">Choose same rate for all Displays?</span>
          <button
            type="button"
            className={`w-10 h-6 flex items-center rounded-full border-2 border-[#b2c2e0] ${sameRate ? 'bg-[#b2c2e0]' : 'bg-transparent'}`}
            onClick={() => setSameRate(v => !v)}
            aria-label="Toggle same rate for all displays"
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${sameRate ? 'translate-x-4' : ''}`}
            />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <i className="ri-error-warning-line text-[#ffb347] text-xl mr-1" />
        <span className="text-xs text-orange-200 font-semibold">The amount you enter will be paid for each day the campaign runs. Make sure your offer reflects the full daily payment you intend to make.</span>
      </div>
      <div className="flex gap-6">
        {displays.map((d, i) => (
          <div key={d._id} className="flex-1 bg-[#26304a] rounded-lg p-5 flex flex-col min-w-[220px]">
            <div className="mb-4 text-base font-bold text-white">#{i+1} <span className="font-normal">{d.description}</span></div>
            <label className="text-xs text-gray-400 mb-1">Your offer</label>
            <div className="flex items-center bg-[#232b3b] border border-[#2e3a4d] rounded px-4 py-2 mb-2">
              <span className="font-bold text-lg text-white mr-2">$</span>
              <input
                type="number"
                className="bg-transparent border-none outline-none text-white font-bold w-16 text-lg mr-2"
                value={offers[d._id] || ''}
                onChange={e => handleOfferChange(d._id, e.target.value)}
                disabled={sameRate && i > 0}
                min={0}
              />
              <span className="text-xs text-gray-400 ml-auto">Per Day</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 