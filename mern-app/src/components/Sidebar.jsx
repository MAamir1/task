import SidebarLink from "./SidebarLink";
// import 'remixicon/fonts/remixicon.css';

export default function Sidebar() {
  return (
    <aside className="w-52 bg-[#33363d] h-screen fixed left-0 top-0 p-0 flex flex-col z-30 font-[Poppins,sans-serif]">
      <div className="px-5 pt-3 pb-2">
        <div className="text-[36px] font-bold leading-none text-[#f4f4f4] mb-10 tracking-tight">City17</div>
        <nav className="flex flex-col gap-5">
          <a href="#" className="flex items-center gap-4 text-[#96999F] font-semibold hover:text-white transition-colors">
            <i className="ri-apps-2-line text-xl" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-4 text-[#96999F] font-semibold hover:text-white transition-colors">
            <i className="ri-layout-4-line text-xl" />
            Campaigns
          </a>
          <a href="#" className="flex items-center gap-4 text-[#96999F] font-semibold hover:text-white transition-colors">
            <i className="ri-barcode-line text-xl" />
            Billing
          </a>
          <a href="#" className="flex items-center gap-4 text-[#96999F] font-semibold hover:text-white transition-colors">
            <i className="ri-tv-2-line text-xl" />
            My Displays
          </a>
          <a href="#" className="flex items-center gap-4 text-[#96999F] font-semibold hover:text-white transition-colors">
            <i className="ri-settings-3-line text-xl" />
            Settings
          </a>
          <a href="#" className="flex items-center gap-4 text-[#96999F] font-extrabold hover:text-white transition-colors mt-2">
            <i className="ri-headphone-line text-xl" />
            <span className="font-bold">Live help</span>
          </a>
        </nav>
      </div>
      <div className="flex-1" />
      <div className="px-7 pb-7 mt-auto">
        <a href="#" className="flex items-center gap-4 text-[#96999F] font-bold hover:text-white transition-colors">
          <i className="ri-logout-box-r-line text-xl" />
          Logout
        </a>
      </div>
    </aside>
  );
} 