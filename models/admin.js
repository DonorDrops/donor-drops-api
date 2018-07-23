const mongoose = require('mongoose');
// Schema.Types.Decimal128,

const Schema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  username: {
    type: String,
    trim; true
  },
  email: {
    type: String,
    required: [true,'Email is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  created: {
    type: Date,
    default: new Date()
  },
  deleted: {
    type: Date
  },
  disabled: {
    type: Date
  }
});
module.exports = mongoose.model('Admin', Schema);
