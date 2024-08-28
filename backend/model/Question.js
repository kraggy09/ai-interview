import moment from "moment-timezone";
import mongoose from "mongoose";
import getTime from "../config/getTime.js";
const IST = "Asia/Kolkata";

let questionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: () => moment.tz(getTime(), IST),
  },
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
  difficulty: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    required: true,
  },
  feedback: {
    positive: { type: String },
    negative: { type: String },
  },
  rating: {
    clarity: { type: Number, default: 0 },
    completeness: { type: Number, default: 0 },
    relevance: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
  },
});

questionSchema.index({ interview: 1 });

const Question = mongoose.model("Question", questionSchema);
export default Question;
