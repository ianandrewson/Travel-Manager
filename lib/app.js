const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/trips', require('./routes/trip.js'));
app.use('/api/v1/iteneraryItems', require('./routes/itenerary.js'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
