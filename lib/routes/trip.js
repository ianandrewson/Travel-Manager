const { Router } = require('express');
const Trip = require('../models/Trip.js');

module.exports = Router()
  .post('/', (req, res) => {
    Trip
      .create(req.body)
      .then(trip => res.send(trip));
  })
  .get('/', (req, res) => {
    Trip
      .find()
      .then(trips => res.send(trips));
  })
  .get('/:id', (req, res) => {
    Trip
      .findById(req.params.id)
      .then(trip => res.send(trip));
  })
  .patch('/:id', (req, res) => {
    const { name } = req.body;
    Trip
      .findByIdAndUpdate(req.params.id, { name }, { new: true })
      .then(trip => res.send(trip));
  })
  .delete('/:id', (req, res) => {
    Trip
      .findByIdAndDelete(req.params.id)
      .then(trip => res.send(trip));
  });
