export default function MapPlaceholder() {
  return (
    <div className="bg-[#232b3b] rounded-lg flex-1 h-64 flex items-center justify-center relative">
      <div className="absolute left-10 top-10 w-12 h-12 bg-[#3a4a6b] rounded-full flex items-center justify-center text-xl font-bold">34</div>
      <div className="absolute left-32 top-32 w-8 h-8 bg-[#3a4a6b] rounded-full flex items-center justify-center text-lg font-bold">10</div>
      <span className="text-gray-500">[Map Placeholder]</span>
    </div>
  );
} 