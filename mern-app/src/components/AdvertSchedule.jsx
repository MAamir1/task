export default function AdvertSchedule({ displays, schedule, onToggle, timeSlots }) {
  // If no timeSlots provided, default to 24 hours
  const slots = timeSlots || Array.from({length: 24}, (_, i) => ({
    range: `${(i % 12 || 12).toString().padStart(2, '0')}:00 ${(i+1)%12 === 0 ? 12 : (i+1)%12}:00`,
    period: i < 12 ? 'AM' : 'PM'
  }));

  return (
    <div className="bg-[#232b3b] rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <div className="text-xl font-bold text-white">Advert Schedule</div>
        <div className="flex gap-6 text-xs font-semibold">
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-green-500 rounded inline-block"></span>Selected</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-[#2e3a4d] rounded inline-block"></span>Unselected</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-gray-600 rounded inline-block"></span>Unavailable</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-center border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="text-left px-2 py-1 align-bottom text-[#b2c2e0] font-semibold min-w-[48px]">Display</th>
              {slots.map((h, i) => (
                <th key={i} className="px-0 py-1 text-[#b2c2e0] font-normal w-10 min-w-[40px]">
                  <div className="leading-tight w-10">
                    <div className="text-[11px] font-semibold">{h.range}</div>
                    <div className="text-[10px] text-[#b2c2e0]">{h.period}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displays.map((d, i) => (
              <tr key={d._id}>
                <td className="text-left px-2 py-1 font-bold text-white min-w-[48px]">#{i+1}</td>
                {slots.map((_, hIdx) => (
                  <td key={hIdx} className="p-0 m-0 align-middle w-10 min-w-[40px]">
                    <div className="flex justify-center items-center">
                      <button
                        className={`w-8 h-8 rounded-md focus:outline-none transition-colors duration-100 ${schedule[d._id]?.[hIdx] === 'selected' ? 'bg-green-500' : schedule[d._id]?.[hIdx] === 'unavailable' ? 'bg-gray-600' : 'bg-[#2e3a4d]'}`}
                        style={{border: 'none', outline: 'none'}}
                        onClick={() => onToggle(d._id, hIdx)}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 