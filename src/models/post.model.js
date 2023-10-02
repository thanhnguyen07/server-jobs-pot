const mongoose = require('mongoose');

const {Schema} = mongoose;

const PostSchema = new Schema(
  {
    userId: {type: String},
    postTitle: {type: String},
    postDescription: {type: String},
    hashtag: {type: Array, default: null},
    images: {type: Array, default: null},
  },
  {timestamps: true, versionKey: false},
);

const PostModel = mongoose.model('Post', PostSchema, 'post');

module.exports = PostModel;
