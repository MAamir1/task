const mongoose = require('mongoose');
const displaySchema = new mongoose.Schema({
  title: String,
  name: String,
  phone: String,
  description: String,
  orientation: String,
  size: String,
  image: String,
  address: String,
});
module.exports = mongoose.model('Display', displaySchema); 