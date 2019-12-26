const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Trip'
  },
  description: String,
  longitude: Number,
  latitude: Number,
  woeid: String
});

module.exports = mongoose.Model('IteneraryItem', schema);
