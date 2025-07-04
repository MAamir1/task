export default function DisplayCard({ title, name, phone, description, orientation, size, image }) {
  return (
    <div className="bg-[#232b3b] rounded-lg p-4 flex gap-4 items-center border border-[#2e3a4d]">
      <img src={image} alt={title} className="w-20 h-20 rounded-lg object-cover" />
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-gray-400">{name}</div>
        <div className="text-xs text-gray-400">{phone}</div>
        <div className="text-xs text-gray-500">{description}</div>
        <div className="flex gap-2 mt-2">
          <span className="bg-[#2e3a4d] text-xs px-2 py-1 rounded">{orientation}</span>
          <span className="bg-[#2e3a4d] text-xs px-2 py-1 rounded">{size}</span>
        </div>
      </div>
      <button className="bg-[#2e3a4d] text-white px-2 py-1 rounded text-xs">Add Display +</button>
    </div>
  );
} 