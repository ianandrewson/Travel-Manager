const { Router } = require('express');
const Item = require('../models/IteneraryItem.js');

module.exports = Router()
  .post('/', (req, res) => {
    Item
      .create(req.body)
      .then(item => res.send(item));
  })
  .delete('/:id', (req, res) => {
    Item
      .findByIdAndDelete(req.params.id)
      .then(item => res.send(item));
  });
