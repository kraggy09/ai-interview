import moment from "moment-timezone";
import mongoose from "mongoose";
import getTime from "../config/getTime";

let questionSchema = mongoose.Schema({
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
    type: "String",
    required: true,
  },
  topic: {
    type: "String",
    required: true,
  },
});

questionSchema.index({ interview: 1 });

export default mongoose.model("Question", questionSchema);
