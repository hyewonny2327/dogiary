const mongoose = require('mongoose');

const authNumberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    authNumber: {
      type: Number,
      required: true,
    },
    createAt: {
      type: Date,
      expires: 6000,
      default: Date.now
    }
  },
  {
    collection: 'AuthNumber',
  },
);

const AuthNumber = mongoose.model('AuthNumber', authNumberSchema);
module.exports = AuthNumber;
