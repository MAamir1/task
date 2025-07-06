// import "remixicon/fonts/remixicon.css";
import { useState } from "react";
import OfferType from "./OfferType";

export default function CampaignForm({ onOfferTypeChange, offerType }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <>

    <section className="bg-[#303744] rounded-xl p-8 mb-8 mt-8 border border-[#2e3a4d]">
      {/* Name & Duration Section */}
      <div className="grid grid-cols-2 gap-8 items-stretch">
        {/* Name Card */}
        <div className="bg-[#272F3F] rounded-2xl p-5 h-full flex flex-col justify-between">
          <div>
            <div className="text-3xl font-extrabold text-white mb-2">Name</div>
            <div className="text-medium font-extrabold text-[#b2c2e0] mb-6">Title of the Campaign</div>
            <div className="bg-[#252B3B] rounded-2xl p-4 flex items-center">
              <input
                className="w-full bg-transparent border-none outline-none font-extrabold text-[#b2c2e0] text-3xl"
                placeholder="New Campaign"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <i className="ri-pencil-line ml-2 text-[#b2c2e0] text-2xl" />
            </div>
          </div>
        </div>
        {/* Duration Card */}
        <div className="bg-[#272F3F] rounded-2xl p-5 h-full flex flex-col justify-between">
          <div>
            <div className="text-3xl font-extrabold text-white mb-2">Select Duration</div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1/2">
                <div className="text-xl font-bold text-white mb-2">Start Date</div>
                <div className="bg-[#252B3B] rounded-2xl p-4 flex items-center">
                  <input
                    type="date"
                    className="w-full bg-transparent border-none outline-none font-bold text-[#b2c2e0] text-2xl"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-white">End Date</span>
                  {/* Toggle Switch */}
                  <button
                    type="button"
                    className={`ml-2 w-10 h-6 flex items-center rounded-full border-2 border-[#b2c2e0] ${toggle ? 'bg-[#22c55e]' : 'bg-transparent'}`}
                    onClick={() => setToggle(t => !t)}
                    aria-label="Toggle"
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${toggle ? 'translate-x-4' : ''}`}
                    />
                  </button>
                </div>
                <div className="bg-[#252B3B] rounded-2xl p-4 flex items-center">
                  <input
                    type="date"
                    className="w-full bg-transparent border-none outline-none font-bold text-[#b2c2e0] text-2xl"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    disabled={!toggle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>


          {/* Offer Type Section */}
    <div className="bg-[#303744] rounded-xl p-8 mb-8 border border-[#2e3a4d]">
    <div className="text-3xl font-extrabold mb-4">Select an Offer Type</div>
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
  </>
  );
} 