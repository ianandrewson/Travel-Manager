require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip.js');
const Item = require('../lib/models/IteneraryItem.js');
const connect = require('../lib/utils/connect.js');
const app = require('../lib/app.js');

describe('trip route tests', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });

  let trip;
  beforeEach(async() => {
    trip = await Trip.create({ name: 'Trip to Germany 2020' });
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('should post a new Item', () => {
    return request(app)
      .post('/api/v1/iteneraryItems')
      .send({
        name: 'Visit the Capital',
        startDate: new Date('2020-07-23'),
        endDate: new Date('2020-07-25'),
        trip: trip._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Visit the Capital',
          startDate: '2020-07-23T00:00:00.000Z',
          endDate: '2020-07-25T00:00:00.000Z',
          trip: trip._id,
          __v: 0
        });
      });
  });


  it('should be able to delete a trip by ID', async() => {
    const item = await Item.create({ 
      name: 'Visit the Capital',
      startDate: new Date('2020-07-23'),
      endDate: new Date('2020-07-25'),
      trip: trip._id
    });
    return request(app)
      .delete(`/api/v1/iteneraryItems/${item._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Visit the Capital',
          startDate: '2020-07-23T00:00:00.000Z',
          endDate: '2020-07-25T00:00:00.000Z',
          trip: trip._id,
          __v: 0
        });
      });
  });
});
