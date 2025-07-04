export default function SidebarLink({ children, active }) {
  return (
    <div className={`px-4 py-2 rounded ${active ? "bg-[#2e3a4d] text-white font-semibold" : "text-gray-400 hover:bg-[#2e3a4d] hover:text-white"}`}>
      {children}
    </div>
  );
} 