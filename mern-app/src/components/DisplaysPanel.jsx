import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import L from "leaflet";
// import "remixicon/fonts/remixicon.css";

const usaCenter = [39.8283, -98.5795];

function DisplayCard({ display, onAdd, isSelected }) {
  return (
    <div className="bg-[#26304a] rounded-lg p-3 flex flex-col mb-4">
      <div className="flex items-center mb-2">
        <img src={display.image} alt="" className="w-24 h-12 rounded object-cover mr-3" />
        <div className="flex-1">
          <div className="font-semibold text-white truncate">{display.title}</div>
          <div className="text-xs text-[#b2c2e0]">{display.address}</div>
        </div>
        <button
          className={`ml-4 px-3 py-1 rounded ${isSelected ? 'bg-[#22c55e] text-white' : 'bg-[#2e3a4d] text-white hover:bg-[#22c55e]'} transition-colors`}
          onClick={() => onAdd(display)}
          disabled={isSelected}
        >
          <i className="ri-add-line text-lg" /> {isSelected ? 'Added' : 'Add Display'}
        </button>
      </div>
      <div className="flex items-center text-xs text-[#b2c2e0] gap-2">
        <span className="bg-[#232b3b] rounded px-2 py-0.5">{display.orientation}</span>
        <span className="bg-[#232b3b] rounded px-2 py-0.5">{display.size}</span>
        <span className="bg-[#232b3b] rounded px-2 py-0.5">{display.resolution}</span>
      </div>
      <div className="text-xs text-white mt-1">{display.description}</div>
      <div className="flex justify-between items-center mt-1">
        <span className="font-semibold text-white">{display.name}</span>
        <span className="text-xs text-[#ffb347] underline">{display.phone}</span>
      </div>
    </div>
  );
}

// Helper: geocode address to lat/lon using Nominatim
async function geocodeAddress(address) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };
  }
  return null;
}

// Helper: calculate distance between two lat/lon points in km
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function DisplaysPanel({ selectedDisplays, onAddDisplay, onRemoveDisplay }) {
  const [displays, setDisplays] = useState([]);
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState(null); // {lat, lon}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapCenter, setMapCenter] = useState(usaCenter);
  const mapRef = useRef();
  const [searchPlaceName, setSearchPlaceName] = useState("");
  const [searchPlaceAddress, setSearchPlaceAddress] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/displays")
      .then(res => {
        console.log('Fetched displays:', res.data); // Debug: log fetched data
        setDisplays(res.data);
      });
  }, []);

  // Custom marker icon
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41]
  });

  // Filter displays by proximity if searchLocation is set
  let filteredDisplays = displays;
  if (searchLocation) {
    filteredDisplays = displays.filter(d => {
      if (!d.location || !Array.isArray(d.location) || d.location.length !== 2) return false;
      const [lat, lon] = d.location;
      return getDistanceFromLatLonInKm(lat, lon, searchLocation.lat, searchLocation.lon) <= 10;
    });
  }

  // Handle Enter key in search input
  const handleSearchKeyDown = async (e) => {
    if (e.key === "Enter" && search.trim()) {
      setLoading(true);
      setError("");
      const loc = await geocodeAddress(search.trim());
      setLoading(false);
      if (loc) {
        setSearchLocation(loc);
        setMapCenter([loc.lat, loc.lon]);
        setSearchPlaceName(filteredDisplays.length === 1 && filteredDisplays[0].title ? filteredDisplays[0].title : 'Searched Area');
        setSearchPlaceAddress(filteredDisplays.length === 1 && filteredDisplays[0].address ? filteredDisplays[0].address : '');
      } else {
        setError("Area not found. Try a different address or area name.");
        setSearchLocation(null);
      }
    }
  };

  return (
    <section>
      {/* Search Displays Section */}
      <section className="bg-[#26304a] rounded-lg p-6 border border-[#2e3a4d] mb-6">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold flex-1 text-white">Search Displays</h2>
          <div className="flex items-center text-[#ffb347] text-base">
            <i className="ri-information-line text-xl mr-1" />
            Enter an area or address and press Enter to search nearby restaurants.
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <input
              className="w-full bg-[#232b3b] border border-[#2e3a4d] rounded px-10 py-2 text-white placeholder:text-[#b2c2e0]"
              placeholder="Search Address or Area (press Enter)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              disabled={loading}
            />
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[#b2c2e0] text-lg" />
            {loading && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b2c2e0] text-xs">Loading...</span>}
          </div>
          <button className="flex items-center bg-[#2e3a4d] text-white px-4 py-2 rounded" disabled>
            <i className="ri-filter-3-line text-lg mr-2" />
            Filter Displays
          </button>
        </div>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        {searchLocation && (
          <div className="flex items-center bg-[#232b3b] rounded-lg mb-4 p-4 border border-[#2e3a4d]">
            <img
              src={
                filteredDisplays.length === 1 && filteredDisplays[0].image
                  ? filteredDisplays[0].image
                  : `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${searchLocation.lon},${searchLocation.lat}&z=15&l=map&size=450,200&pt=${searchLocation.lon},${searchLocation.lat},pm2rdm`
              }
              alt="Searched Place"
              className="w-48 h-28 object-cover rounded-lg mr-4 border-2 border-[#2e3a4d]"
            />
            <div>
              <div className="text-white font-bold text-lg">
                {filteredDisplays.length === 1 && filteredDisplays[0].title
                  ? filteredDisplays[0].title
                  : (searchPlaceName || 'Searched Area')}
              </div>
              <div className="text-[#b2c2e0] text-sm">
                {filteredDisplays.length === 1 && filteredDisplays[0].address
                  ? filteredDisplays[0].address
                  : (searchPlaceAddress || '')}
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-6">
          <div className="rounded-lg overflow-hidden" style={{ width: 480, height: 320 }}>
            <MapContainer center={mapCenter} zoom={searchLocation ? 10 : 4} style={{ width: "100%", height: "100%" }} scrollWheelZoom={false} ref={mapRef}>
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredDisplays.map((d, i) => (
                <Marker key={d._id || i} position={d.location || usaCenter} icon={markerIcon}>
                  <Popup>{d.address || d.title || "Display"}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div className="w-96 space-y-4 max-h-[320px] overflow-y-auto pr-2">
            {filteredDisplays.map(display => (
              <DisplayCard
                key={display._id}
                display={display}
                onAdd={onAddDisplay}
                isSelected={!!selectedDisplays.find(d => d._id === display._id)}
              />
            ))}
            {filteredDisplays.length === 0 && <div className="text-white">No displays found in this area.</div>}
          </div>
        </div>
      </section>
      {/* Selected Displays Section */}
      <div className="bg-[#232b3b] rounded-lg p-4 mb-6 border border-[#2e3a4d]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-bold text-white">Selected Displays</span>
          <span className="text-xl font-bold text-white">{String(selectedDisplays.length).padStart(2, '0')}</span>
        </div>
        <div className="space-y-3">
          {selectedDisplays.map((d, i) => (
            <div key={d._id} className="flex items-center bg-[#26304a] rounded-lg px-3 py-2">
              <span className="w-10 text-center font-bold text-[#b2c2e0] text-lg">#{i+1}</span>
              <img src={d.image} alt="" className="w-16 h-12 rounded-lg object-cover mr-3" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate">{d.description}</div>
                <div className="flex gap-2 text-xs text-[#b2c2e0] mb-1">
                  <span className="bg-[#232b3b] rounded px-2 py-0.5">{d.orientation}</span>
                  <span className="bg-[#232b3b] rounded px-2 py-0.5">{d.size}</span>
                  <span className="bg-[#232b3b] rounded px-2 py-0.5">{d.resolution}</span>
                </div>
                <div className="text-xs text-[#b2c2e0] truncate">{d.title}</div>
                <div className="text-xs text-[#b2c2e0] truncate">{d.address}</div>
              </div>
              <div className="flex flex-col items-end min-w-[120px] ml-3">
                <div className="font-semibold text-white truncate">{d.name}</div>
                <div className="text-xs text-[#ffb347] underline truncate">{d.phone}</div>
              </div>
              <button onClick={() => onRemoveDisplay(d._id)} className="ml-4 text-white bg-[#2e3a4d] rounded-full p-2 hover:bg-[#ff4d4f] transition-colors">
                <i className="ri-delete-bin-6-line text-lg" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}