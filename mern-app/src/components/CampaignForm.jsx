// import "remixicon/fonts/remixicon.css";
import { useState } from "react";
import OfferType from "./OfferType";

export default function CampaignForm({ onOfferTypeChange, offerType }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <section className="bg-[#26304a] rounded-xl p-4 mb-6 border border-[#2e3a4d]">
      {/* Name & Duration Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Name Card */}
        <div className="bg-[#232b3b] rounded-lg p-5 border border-[#2e3a4d]">
          <div className="text-2xl font-bold text-white mb-2">Name</div>
          <div className="text-sm text-[#b2c2e0] mb-3">Title of the Campaign</div>
          <div className="relative">
            <input
              className="w-full bg-[#232b3b] border border-[#2e3a4d] rounded px-4 py-2 text-white pr-10 focus:outline-none"
              placeholder="New Campaign"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <i className="ri-pencil-line absolute right-3 top-1/2 -translate-y-1/2 text-[#b2c2e0] text-lg" />
          </div>
        </div>
        {/* Duration Card */}
        <div className="bg-[#232b3b] rounded-lg p-5 border border-[#2e3a4d]">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-white">Select Duration</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <div className="text-sm text-[#b2c2e0] mb-1">Start Date</div>
              <div className="relative">
                <input
                  type="date"
                  className="bg-[#232b3b] border border-[#2e3a4d] rounded px-4 py-2 text-white w-full pr-10 focus:outline-none"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
                <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text-[#b2c2e0] text-lg" />
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[#b2c2e0]">End Date</span>
                {/* Toggle Switch */}
                <button
                  type="button"
                  className={`ml-2 w-8 h-5 flex items-center rounded-full border-2 border-[#b2c2e0] ${toggle ? 'bg-[#b2c2e0]' : 'bg-transparent'}`}
                  onClick={() => setToggle(t => !t)}
                  aria-label="Toggle"
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${toggle ? 'translate-x-3' : ''}`}
                  />
                </button>
              </div>
              <div className="relative">
                <input
                  type="date"
                  className="bg-[#232b3b] border border-[#2e3a4d] rounded px-4 py-2 text-white w-full pr-10 focus:outline-none"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
                <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text-[#b2c2e0] text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Offer Type Section */}
      <div className="mt-8">
        <div className="text-2xl font-bold mb-4">Select an Offer Type</div>
        <div className="flex flex-col gap-3">
          <OfferType
            title="Bid Rate"
            description="Bid a competitive price for your desired hours. The seller will approve campaigns, and the system will automatically select the highest paying bid for each available hour."
            active={offerType === "bid"}
            onClick={() => onOfferTypeChange("bid")}
          />
          <OfferType
            title="Make a Fixed Offer"
            description="Set a fixed price for the display time you want. If the seller accepts, those hours are booked exclusively for your campaign."
            active={offerType === "fixed"}
            onClick={() => onOfferTypeChange("fixed")}
          />
        </div>
      </div>
    </section>
  );
} 