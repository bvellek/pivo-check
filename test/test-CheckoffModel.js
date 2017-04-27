const expect = require('chai').expect;

const Checkoff = require('../models/checkoff');

describe('Checkoff Model', () => {
  it('should be invalid if breweryID, userID, cityID are empty', (done) => {
    const checkoffTest = new Checkoff();

    checkoffTest.validate((err) => {
      expect(err.errors.cityID).to.exist;
      expect(err.errors.userID).to.exist;
      expect(err.errors.breweryID).to.exist;
      done();
    });
  });
  it('should not throw error for userID = string, breweryID = string,cityID = string', (done) => {
    const checkoffTest = new Checkoff({
      userID: 'TEST123',
      breweryID: 'breW1',
      cityID: 'adsfl3',
    });

    checkoffTest.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });
});
