import express from "express";
import {
  evaluateInterview,
  generateInterview,
  getCompletedInterviews,
} from "../controller/Interview.js";

const router = express.Router();

router.route("/newInterview").post(generateInterview);
router.route("/evaluateInterview").post(evaluateInterview);
router.route("/getCompletedInterviews").get(getCompletedInterviews);

export default router;
