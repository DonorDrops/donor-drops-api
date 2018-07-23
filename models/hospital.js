const mongoose = require('mongoose');
// Schema.Types.Decimal128,
const Schema = mongoose.Schema;

const hospital = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  }
  contact: [
    website:{
      type: String,
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
    },
    region: {
      type: String,
    },
    city: {
      type: String,
    }
  ]

});
module.exports = mongoose.model('Hospital', hospital);
