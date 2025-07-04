const express = require('express');
const router = express.Router();
const Display = require('../models/Display');

// Get all displays
router.get('/', async (req, res) => {
  const displays = await Display.find();
  res.json(displays);
});

// Add a new display
router.post('/', async (req, res) => {
  const display = new Display(req.body);
  await display.save();
  res.json(display);
});

module.exports = router; 