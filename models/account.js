const mongoose = require('mongoose');
// Schema.Types.Decimal128,

const Schema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  href: {
    type: String,
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Account type is required'],
    lowercase: true,
    trim: true
  },
  avatar: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: new Date()
  },
});
Schema.path('type').set(function (v) {
  // Modifying Schema due to account type
  if ( v != null || v != undefined || v != '' ) {
    switch (v) {
      case 'farmer':
        Schema.add({details: FarmerSchema});
        break;
      case 'company':
        Schema.add({details: CompanySchema});
        break;
      default:
    }
  }

  return v;
});
module.exports = mongoose.model('Account', Schema);

const FarmerSchema = {
  rfId: {
    type: String,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  nickName: {
    type: String,
    trim: true
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    lowercase: true,
    trim: true
  }
};
const CompanySchema = {
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    lowercase: true,
    trim: true
  }
};
