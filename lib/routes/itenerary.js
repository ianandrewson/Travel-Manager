const { Router } = require('express');
const Item = require('../models/IteneraryItem.js');
const Trip = require('../models/Trip.js');
const woeidMiddleware = require('../middleware/woeid.js');

module.exports = Router()
  .post('/', woeidMiddleware, (req, res) => {
    Item
      .create({ ...req.body, trip: req.params._id, woeid: req.woeid })
      .then(item => res.send(item))
      .then(() => {
        Trip
          .findById(req.params._id)
          .populate('itenerary');
      });
  })
  .delete('/:id', (req, res) => {
    Item
      .findByIdAndDelete(req.params.id)
      .then(item => res.send(item));
  });
