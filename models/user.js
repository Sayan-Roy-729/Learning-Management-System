const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    userPhoneNumber: {
        type: Number,
        required: false,
    },
    collegeName: {
      type: String,
      required: false,
    },
    userCity: {
        type: String,
        required: false,
    },
    userPinCode: {
        type: Number,
        required: false,
    },
    userState: {
        type: String,
        required: false,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('User', userSchema);
