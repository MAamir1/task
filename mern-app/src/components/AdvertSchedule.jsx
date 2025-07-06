export default function AdvertSchedule({ displays, schedule, onToggle, timeSlots }) {
  // If no timeSlots provided, default to 24 hours
  const slots = timeSlots || Array.from({length: 24}, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? 'AM' : 'PM';
    return {
      hour: `${hour.toString().padStart(2, '0')}:00`,
      period,
    };
  });

  return (
    <div className="bg-[#303744] rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <div className="text-3xl font-extrabold text-white">Advert Schedule</div>
        <div className="flex gap-6 text-xs font-semibold">
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-green-500 rounded inline-block"></span>Selected</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-[#2e3a4d] rounded inline-block"></span>Unselected</div>
          <div className="flex items-center gap-1"><span className="w-4 h-4 bg-gray-600 rounded inline-block"></span>Unavailable</div>
        </div>
      </div>
      <div className="relative group">
        <div
          className="overflow-x-auto pb-2"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE 10+
          }}
        >
          <table className="min-w-full text-xs text-center border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left px-2 py-1 align-bottom text-[#b2c2e0] font-extrabold min-w-[48px]"></th>
                {slots.map((h, i) => (
                  <th
                    key={i}
                    className={`px-0 py-1 text-[#b2c2e0] font-normal w-14 min-w-[56px] ${i > 19 ? 'hidden md:table-cell' : ''}`}
                  >
                    <div className="flex flex-col items-center w-14">
                      <span className="text-base font-bold leading-tight">{h.hour}</span>
                      <span className="text-xs font-bold leading-tight mt-0.5">{h.period}</span>
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
        {/* Custom scroll line indicator, only on hover */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-[#353b48] via-[#b2c2e0] to-[#353b48] opacity-50 pointer-events-none invisible group-hover:visible transition-all duration-200" />
      </div>
    </div>
  );
} 