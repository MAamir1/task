import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CampaignForm from "./components/CampaignForm";
import DisplaysPanel from "./components/DisplaysPanel";
import AdvertSchedule from "./components/AdvertSchedule";
import UploadAdvertisement from "./components/UploadAdvertisement";
import FixedOffer from "./components/FixedOffer";
import Summary from "./components/Summary";
import React from "react";

// Example displays data (replace with real backend data)
const initialDisplays = [
  {
    _id: "1",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Above my shop on the outside wall",
    orientation: "Horizontal",
    size: "1080*720",
    title: "Jamie Oliver Restaurant",
    name: "James Wilson",
    phone: "02 444 12114",
    address: "488 George St, Sydney NSW 2000"
  },
  
  // ...more displays
];

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default function App() {
  const [allDisplays, setAllDisplays] = useState([]);
  const [selectedDisplays, setSelectedDisplays] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [uploads, setUploads] = useState({});
  const [sameFile, setSameFile] = useState(false);
  const [offerType, setOfferType] = useState("fixed"); // or "bid"
  const [offers, setOffers] = useState({});
  const [sameRate, setSameRate] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  // Fetch all displays from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/displays")
      .then(res => setAllDisplays(res.data));
  }, []);

  // Fetch all campaigns (example)
  useEffect(() => {
    axios.get("/api/campaigns").then(res => setCampaigns(res.data));
  }, []);

  // Keep schedule in sync with selectedDisplays
  useEffect(() => {
    setSchedule(prev => {
      const updated = { ...prev };
      selectedDisplays.forEach(d => {
        if (!updated[d._id]) updated[d._id] = Array(24).fill(null);
      });
      Object.keys(updated).forEach(id => {
        if (!selectedDisplays.find(d => d._id === id)) delete updated[id];
      });
      return updated;
    });
  }, [selectedDisplays]);

  const handleAddDisplay = (display) => {
    if (!selectedDisplays.find(d => d._id === display._id)) {
      setSelectedDisplays([...selectedDisplays, display]);
    }
  };
  const handleRemoveDisplay = (id) => {
    setSelectedDisplays(selectedDisplays.filter(d => d._id !== id));
  };

  const handleToggle = (id, hour) => {
    setSchedule(sch =>
      ({ ...sch, [id]: sch[id]?.map((v, i) => i === hour ? (v === 'selected' ? null : 'selected') : v) })
    );
  };

  // File upload handler using axios
  const handleUpload = async (id, file) => {
    if (!file) {
      console.error('No file provided to upload.');
      return 'No file provided to upload.';
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/api/uploads', formData);
      const fileUrl = res.data.url;
      if (sameFile) {
        const layout = selectedDisplays.find(d => d._id === id)?.orientation;
        const ids = selectedDisplays.filter(d => d.orientation === layout).map(d => d._id);
        setUploads(u => ({ ...u, ...Object.fromEntries(ids.map(i => [i, fileUrl])) }));
      } else {
        setUploads(u => ({ ...u, [id]: fileUrl }));
      }
      return null; // No error
    } catch (err) {
      let msg = 'File upload failed';
      if (err.response && err.response.data && err.response.data.error) {
        msg = err.response.data.error;
      }
      console.error('Upload error:', err);
      return msg;
    }
  };

  // Create campaign handler
  const handleCreateCampaign = async () => {
    const campaignData = {
      name: "New Campaign", // Replace with real name from form if needed
      startDate: new Date(), // Replace with real start date
      endDate: new Date(),   // Replace with real end date
      offerType,
      displays: selectedDisplays.map(d => d._id),
      schedule,
      uploads,
      offers
    };
    try {
      await axios.post('/api/campaigns', campaignData);
      alert('Campaign created!');
    } catch (err) {
      alert('Failed to create campaign');
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#232b3b] text-white font-sans flex">
        <Sidebar />
        <main className="flex-1 p-4 pt-0 bg-[#8c9196]">
          <Header />
          <CampaignForm offerType={offerType} onOfferTypeChange={setOfferType} />
          <DisplaysPanel
            allDisplays={allDisplays}
            selectedDisplays={selectedDisplays}
            onAddDisplay={handleAddDisplay}
            onRemoveDisplay={handleRemoveDisplay}
          />
          <AdvertSchedule
            displays={selectedDisplays}
            schedule={schedule}
            onToggle={handleToggle}
          />
          <UploadAdvertisement
            displays={selectedDisplays}
            uploads={uploads}
            onUpload={handleUpload}
            sameFile={sameFile}
            onToggleSameFile={() => setSameFile(v => !v)}
          />
          <FixedOffer
            displays={selectedDisplays}
            offers={offers}
            setOffers={setOffers}
            sameRate={sameRate}
            setSameRate={setSameRate}
          />
          <Summary
            displays={selectedDisplays}
            offers={offers}
            duration={"Ongoing"}
            hours={120}
            locations={selectedDisplays.length}
          />
          <button className="w-full mt-4 bg-[#232b3b] rounded-xl py-4 text-2xl font-bold text-white text-center tracking-wide shadow-none border-none focus:outline-none" onClick={handleCreateCampaign}>
            Create Campaign
          </button>
        </main>
      </div>
    </ErrorBoundary>
  );
}
