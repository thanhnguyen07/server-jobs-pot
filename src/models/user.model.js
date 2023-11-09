const {UserInfo} = require('firebase-admin/auth');
const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema(
  {
    user_name: {type: String},
    email: {type: String},
    uid: {type: String},
    email_verified: {type: Boolean, default: false},
    provider_data: {type: Array, default: []},
    fcm_token: {type: String, default: null},
    photo_url: {type: String, default: null},
    date_of_birth: {type: String, default: null},
    gender: {type: String, default: null},
    phone_number: {type: String, default: null},
    location: {type: String, default: null},
  },
  {timestamps: true, versionKey: false},
);

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
