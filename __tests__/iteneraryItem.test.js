const ItneraryItem = require('../lib/models/IteneraryItem.js');

describe('Itenerary Item tests', () => {
  it('has a required name field', () => {
    const item = new ItneraryItem();
    const { errors } = item.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  it('has a required start date', () => {
    const item = new ItneraryItem();
    const { errors } = item.validateSync();
    expect(errors.startDate.message).toEqual('Path `startDate` is required.');
  });
  it('has a required end date', () => {
    const item = new ItneraryItem();
    const { errors } = item.validateSync();
    expect(errors.endDate.message).toEqual('Path `endDate` is required.');
  });
  it('has a required trip', () => {
    const item = new ItneraryItem();
    const { errors } = item.validateSync();
    expect(errors.tripId.message).toEqual('Path `tripId` is required.');
  });
});

// beforeAll(() => {
//   connect();
// });
// beforeEach(() => {
//   return mongoose.connection.dropDatabase();
// });
// beforeEach(() => {
//   return const trip = Trip.create()
// });
// afterAll(() => {
//   mongoose.connection.close();
// });