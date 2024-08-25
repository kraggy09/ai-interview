import moment from "moment-timezone";
import mongoose, { mongo } from "mongoose";
import getTime from "../config/getTime";

const interviewSchema = mongoose.Schema({
  date: {
    type: Date,
    default: () => moment.tz(getTime(), IST),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  overallGrade: {
    type: Number,
  },
  reviews: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  skills: [
    {
      name: String,
      rating: Number,
      review: String,
    },
  ],
  improvements: {
    type: "String",
  },
  strengths: {
    type: String,
  },
  interviewStage: {
    type: String,
    enum: ["Interviewing", "Completed"],
    default: "Interviewing", // Set default to 'Interviewing' if desired
  },
});

export default mongoose.model("Interview", interviewSchema);
