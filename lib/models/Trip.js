const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String
}, {
  id: false,
  toJSON: { virtuals: true }
});

schema.virtual('itenerary', {
  ref: 'IteneraryItems',
  localField: '_id',
  foreignField: 'tripId'
});

module.exports = mongoose.model('Trip', schema);
