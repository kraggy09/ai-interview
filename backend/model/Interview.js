import moment from "moment-timezone";
import mongoose, { Schema } from "mongoose";
import getTime from "../config/getTime.js";

const IST = "Asia/Kolkata";
const interviewSchema = new Schema(
  {
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
    role: {
      type: String,
      required: true,
    },
    skills: {
      type: Object,
    },

    comment: {
      type: String,
    },
    interviewStage: {
      type: String,
      enum: ["Interviewing", "Completed", "Evaluating"],
      default: "Interviewing", // Set default to 'Interviewing' if desired
    },
    improvements: {
      type: String,
    },
    level: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
