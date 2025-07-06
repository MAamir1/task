import { useRef } from "react";
import { Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import "antd/dist/reset.css";
// import "remixicon/fonts/remixicon.css";

// TEMP: Dummy data for testing cards. Remove or comment out after testing.
const dummyDisplays = [
  { _id: '1', description: 'Above Shop on the Outside Wall', orientation: 'Horizontal' },
  { _id: '2', description: 'Standee outside my shop', orientation: 'Vertical' },
  { _id: '3', description: 'Above Shop on the Outside Wall', orientation: 'Horizontal' }
];

export default function UploadAdvertisement({ selectedDisplays = dummyDisplays, uploads, onUpload, sameFile, onToggleSameFile }) {
  const handleUpload = (id, url) => {
    onUpload(id, url);
  };

  return (
    <div className="bg-[#303744] rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-3xl font-extrabold text-white">Upload Advertisement</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-200 mr-2">Choose same file for same Layouts?</span>
          <button
            type="button"
            className={`w-10 h-6 flex items-center rounded-full border-2 border-[#b2c2e0] ${sameFile ? 'bg-[#22c55e]' : 'bg-transparent'}`}
            onClick={onToggleSameFile}
            aria-label="Toggle same file for layouts"
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${sameFile ? 'translate-x-4' : ''}`}
            />
          </button>
        </div>
      </div>
      <div className="flex gap-6">
        {selectedDisplays.map((d, i) => (
          <div key={d._id} className="flex-1 bg-[#272F3F] rounded-lg p-5 flex flex-col items-center min-w-[220px]">
            <div className="mb-4 text-base font-bold text-white">#{i+1} <span className="font-normal">{d.description}</span></div>
            <Upload.Dragger
              accept="image/*"
              showUploadList={false}
              customRequest={async ({ file, onSuccess, onError }) => {
                if (!(file instanceof File)) {
                  const msg = 'Selected file is not valid.';
                  console.error(msg, file);
                  onError && onError(new Error(msg));
                  alert(msg);
                  return;
                }
                try {
                  const errorMsg = await onUpload(d._id, file);
                  if (errorMsg) {
                    alert(errorMsg);
                    onError && onError(new Error(errorMsg));
                  } else {
                    onSuccess && onSuccess();
                  }
                } catch (err) {
                  const msg = err.message || 'File upload failed';
                  console.error('Upload error:', err);
                  alert(msg);
                  onError && onError(err);
                }
              }}
              className="w-full h-32 mb-3 bg-[#272F3F] border-2 border-dashed border-gray-500 rounded flex flex-col items-center justify-center"
            >
              {uploads[d._id] ? (
                <img src={uploads[d._id]} alt="" className="w-full h-32 object-cover rounded mb-2" />
              ) : (
                <>
                  <UploadOutlined style={{ fontSize: 32, color: '#b2c2e0', marginBottom: 8 }} />
                  <div className="font-semibold text-white">Drag and Drop</div>
                  <div className="text-xs text-blue-400 underline mt-1">or Select File</div>
                </>
              )}
            </Upload.Dragger>
            <div className="flex items-center text-xs text-gray-200 mt-3">
              <i className="ri-error-warning-line text-[#ffb347] mr-1 text-base" />
              Ensure file of <span className="text-[#ffb347] font-semibold ml-1">{d.orientation || 'Horizontal Layout'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 