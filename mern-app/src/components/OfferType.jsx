// import "remixicon/fonts/remixicon.css";

export default function OfferType({ title, description, active, onClick }) {
  return (
    <div
      className={`flex items-center p-5 rounded-lg mb-4 border transition-all duration-200 cursor-pointer ${active ? "border-[#22c55e] bg-[#232b3b] shadow-lg" : "border-[#2e3a4d] bg-[#232b3b]"}`}
      onClick={onClick}
    >
      <div className="flex-1">
        <div className="font-bold text-lg text-white mb-1">{title}</div>
        <div className="flex items-start text-base text-white">
          <i className="ri-information-line text-[#ffb347] text-xl mr-2 mt-0.5" />
          <span className="text-sm text-[#e0e6ed]">{description}</span>
        </div>
      </div>
      <div className="ml-4 flex items-center">
        <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out border-2 ${active ? "bg-[#232b3b] border-[#22c55e]" : "bg-[#232b3b] border-[#b2c2e0]"}`}>
          <div className={`w-4 h-4 rounded-full shadow-md transform duration-200 ${active ? "bg-[#22c55e] translate-x-4" : "bg-[#b2c2e0]"}`}></div>
        </div>
      </div>
    </div>
  );
} 