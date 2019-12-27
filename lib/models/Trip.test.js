const mongoose = require('mongoose');
const Trip = require('./Trip.js');

describe('trip schema tests', () => {
  it('has a required name field', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  it('can create a new trip', () => {
    const trip = new Trip({
      name: 'Trip to Germany 2020'
    });
    expect(trip.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Trip to Germany 2020'
    });
  });
});
