const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip.js');
const connect = require('../lib/utils/connect.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('trip route tests', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    mongoose.connection.close();
  });

  it('should post a new Trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        name: 'Trip to Germany 2020'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(mongoose.Types.ObjectId),
          name: 'Trip to Germany 2020',
          __v: 0
        });
      });
  });

  it('should get all trips', async() => {
    const trips = await Trip.create([
      { name: 'Trip to Germany 2020' },
      { name: 'Trip to Iceland 2021' },
      { name: 'Trip to Antarctica 2022' }
    ]);

    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        trips.forEach(trip => {
          expect(res.body).toContainEqual({
            _id: trip._id.soString(),
            name: trip.name
          });
        });
      });
  });

  it('should be able to get a trip by ID', async() => {
    const trip = await Trip.create({ name: 'Trip to Denmark 2020' });
    return request(app)
      .get(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip.id,
          name: 'Trip to Denmark 2020',
          itenerary: [],
          __v: 0
        });
      });
  });

  it('should be able to update a trip by id', async() => {
    const trip = await Trip.create({ name: 'Trip to China 2011' });
    return request(app)
      .patch(`/api/v1/trips/${trip.id}`)
      .send({ name: 'Trip to China 2021' })
      .then(res => {
        expect(res.body.name).toEqual('Trip to China 2021');
      });
  });

  it('should be able to delete a trip by ID', async() => {
    const trip = await Trip.create({ name: 'Trip to Mexico 2018' });
    return request(app)
      .delete(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip.id,
          name: 'Trip to Mexico 2018',
          itenerary: [],
          __v: 0
        });
      });
  });
});
