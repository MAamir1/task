// import "remixicon/fonts/remixicon.css";
export default function Header({ user = { name: 'Muhammad Aamir', balance: 0, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' } }) {
  return (
    <header
      className="fixed top-0 left-52 w-[calc(100%-13rem)] flex items-center justify-between bg-[#2d3543] px-8 border-b border-[#232b3b] z-40 shadow"
      style={{ minHeight: 70 }}
    >
      <div className="text-[25px] font-bold text-[#b6c7f7] tracking-tight">
        New Campaign
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-cyan-400">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-white font-bold text-xl leading-tight">{user.name}</span>
          <span className="text-white font-bold text-lg leading-tight">A${user.balance}</span>
        </div>
      </div>
    </header>
  );
} 