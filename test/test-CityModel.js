const expect = require('chai').expect;

const City = require('../models/city');

describe('City', () => {
  it('should be invalid if cityName, lat, lng, and userID are empty', (done) => {
    const cityTest = new City();

    cityTest.validate((err) => {
      expect(err.errors.cityName).to.exist;
      expect(err.errors['cityCoords.lat']).to.exist;
      expect(err.errors['cityCoords.lng']).to.exist;
      expect(err.errors.userID).to.exist;
      done();
    });
  });
  it('should not throw error for cityName = string, lat = number, lng = number, and userId = string', (done) => {
    const cityTest = new City({
      cityName: 'Seattle, WA',
      userID: 'TEST123',
      cityCoords: {
        lat: 123,
        lng: 456,
      },
      brewTotal: 5,
    });

    cityTest.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });
});
