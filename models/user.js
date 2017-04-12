const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  google: {
    id: String,
    token: String,
  },
  cityList: [
    {
      cityName: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
      },
      cityCoords: {
        lat: {
          type: Number,
          required: true,
          trim: true,
        },
        lng: {
          type: Number,
          required: true,
          trim: true,
        },
      },
      brewTotal: Number,
      brewCompleted: Number,
    },
  ],
});

userSchema.methods.validPassword = (password) => bcrypt.compareSync(password, this.password);

userSchema.methods.hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

const User = mongoose.model('User', userSchema);

module.exports = User;
