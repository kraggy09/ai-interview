import express from "express";
import {
  evaluateInterview,
  generateInterview,
  getCompletedInterviews,
  getOngoingInterview,
  getSingleInterview,
  getInterviewReport,
} from "../controller/Interview.js";

const router = express.Router();

router.route("/newInterview").post(generateInterview);
router.route("/evaluateInterview").post(evaluateInterview);
router.route("/getCompletedInterviews").get(getCompletedInterviews);
router.route("/getOngoingInterview").get(getOngoingInterview);
router.route("/:id").get(getSingleInterview);
router.route("/report/:id").get(getInterviewReport);

export default router;
