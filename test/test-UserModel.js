const expect = require('chai').expect;

const User = require('../models/user');

describe('User Model', () => {
  it('should be invalid if email, firstName, lastName are empty', (done) => {
    const userTest = new User();

    userTest.validate((err) => {
      expect(err.errors.email).to.exist;
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      done();
    });
  });
  it('should not throw error for email = string, firstName = string, lastName = string', (done) => {
    const userTest = new User({
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
    });

    userTest.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });
});
