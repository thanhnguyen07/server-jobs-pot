const mongoose = require('mongoose');

const {Schema} = mongoose;

const JobSchema = new Schema(
  {
    remote_job: {count: Number, title: String},
    full_time: {count: Number, title: String},
    part_time: {count: Number, title: String},
  },
  {timestamps: true, versionKey: false},
);

const JobModel = mongoose.model('Job', JobSchema, 'jobs');

module.exports = JobModel;
