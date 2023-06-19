const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema(
  {
    userName: {type: String},
    email: {type: String},
    password: {type: String},
  },
  {timestamps: true, versionKey: false},
);

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
