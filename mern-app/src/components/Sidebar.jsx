import SidebarLink from "./SidebarLink";
// import 'remixicon/fonts/remixicon.css';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#232b3b] border-r border-[#2e3a4d] flex flex-col justify-between py-6 px-4 min-h-screen">
      <div>
        <div className="text-2xl font-bold mb-8">City17</div>
        <nav className="space-y-2">
          <SidebarLink><i className="ri-dashboard-line mr-2" />Dashboard</SidebarLink>
          <SidebarLink active><i className="ri-file-list-3-line mr-2" />Campaigns</SidebarLink>
          <SidebarLink><i className="ri-bank-card-line mr-2" />Billing</SidebarLink>
          <SidebarLink><i className="ri-store-2-line mr-2" />Seller</SidebarLink>
          <SidebarLink><i className="ri-notification-3-line mr-2" />Notifications</SidebarLink>
          <SidebarLink><i className="ri-settings-3-line mr-2" />Settings</SidebarLink>
          <SidebarLink><i className="ri-tv-2-line mr-2" />My Displays</SidebarLink>
        </nav>
      </div>
      <div>
        <div className="mb-4 flex items-center">
          <span className="text-xs text-gray-400 flex items-center">
            <i className="ri-money-dollar-circle-line mr-1 text-lg text-[#ffb347]" />0 AUD
          </span>
          <button className="ml-2 text-xs text-[#ffb347] underline">Add Balance</button>
        </div>
        <div className="mb-4 flex items-start gap-2">
          <i className="ri-customer-service-2-line text-lg text-[#ffb347] mt-0.5" />
          <div>
            <div className="text-xs text-gray-400">Live help</div>
            <div className="text-[10px] text-gray-500 leading-tight">World's Biggest Decentralized advertisement platform</div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mb-2">v1.2.14<br/>Be Tesla</div>
        <button className="w-full bg-[#ff4d4f] text-white py-2 rounded flex items-center justify-center gap-2">
          <i className="ri-logout-box-r-line" />Logout
        </button>
      </div>
    </aside>
  );
} 