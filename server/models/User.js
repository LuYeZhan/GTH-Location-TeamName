const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Volunteer', 'Traveler']
  },
  pocket: {
    type: Number,
  },
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }],
  myTrips: [{
    type: ObjectId,
    ref: 'Trip'
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;