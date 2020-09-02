import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GradesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    required: true,
  },
  lastModified: {
    type: Date,
  },
});

export default GradesSchema;
