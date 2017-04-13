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

// Compare passed password with value in database
userSchema.methods.comparePassword = (password, callback) => bcrypt.compare(password, this.password, callback);

// Pre-save hook method
userSchema.pre('save', function saveHook(next) {
  const user = this;

  // continue only if password is modified or user is new
  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(10, (saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, null, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      // replace password string with hash
      user.password = hash;

      return next();
    });
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
