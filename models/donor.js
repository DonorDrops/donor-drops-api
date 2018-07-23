const mongoose = require('mongoose');
// Schema.Types.Decimal128,

const Schema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  avatar: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male','female']
  },
  created: {
    type: Date,
    default: new Date()
  },
  deleted: {
    type: Date,
    default: False
  },
  disabled: {
    type: Date,
    default: False
  },
  contact: [
    email: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    region: {
      type: String
    }
  ]
});
module.exports = mongoose.model('Donor', Schema);
