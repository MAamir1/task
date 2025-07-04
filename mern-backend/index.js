const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/displays', require('./routes/displays'));
const campaignsRouter = require('./routes/campaigns');
const uploadsRouter = require('./routes/uploads');

app.use('/api/campaigns', campaignsRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/uploads', express.static(__dirname + '/uploads'));

app.get('/api/test', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 