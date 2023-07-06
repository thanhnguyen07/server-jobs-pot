const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema(
  {
    userName: {type: String},
    email: {type: String},
    password: {type: String},
    token: {type: String, default: null},
    type: {type: String},
    uid: {type: String},
  },
  {timestamps: true, versionKey: false},
);

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
