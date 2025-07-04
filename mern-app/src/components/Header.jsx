// import "remixicon/fonts/remixicon.css";
export default function Header() {
  return (
    <div className="flex items-center w-full bg-[#232b39] h-14 mb-3">
      {/* Left sidebar/logo */}
      {/* <div className="flex items-center h-full px-4 bg-[#1b2230]">
        <span className="text-lg font-semibold text-white">City17</span>
      </div> */}
      {/* Center: Back arrow and title */}
      <div className="flex items-center ml-6">
        <i className="ri-arrow-left-line text-[#b2c2e0] mr-2 text-lg" />
        <span className="text-lg font-semibold text-[#b2c2e0]">New Campaign</span>
      </div>
      {/* Spacer */}
      <div className="flex-1" />
      {/* Right: User info */}
      <div className="flex items-center space-x-2 mr-4">
        <span className="font-medium text-white">Ally Sul</span>
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-[#2e3a4d]" />
      </div>
    </div>
  );
} 