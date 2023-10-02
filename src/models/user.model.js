const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema(
  {
    userName: {type: String},
    email: {type: String},
    type: {type: String},
    uid: {type: String},
    avatarLink: {type: String, default: null},
    dateOfBirth: {type: String, default: null},
    gender: {type: String, default: null},
    phoneNumber: {type: String, default: null},
    location: {type: String, default: null},
  },
  {timestamps: true, versionKey: false},
);

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
