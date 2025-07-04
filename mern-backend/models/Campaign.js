const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  offerType: { type: String, enum: ['bid', 'fixed'], required: true },
  displays: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Display' }],
  schedule: { type: Object }, // { displayId: [hourStates] }
  uploads: { type: Object },  // { displayId: fileUrl }
  offers: { type: Object },   // { displayId: offerAmount }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema); 