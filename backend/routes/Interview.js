import express from "express";
import {
  evaluateInterview,
  generateInterview,
  getCompletedInterviews,
  getOngoingInterview,
  getSingleInterview,
  getInterviewReport,
} from "../controller/Interview.js";
import {
  verifyTokenFromQuery,
  verifyTokenMiddleware,
} from "../token/verifyToken.js";

const router = express.Router();

router.route("/newInterview").post(verifyTokenMiddleware, generateInterview);
router
  .route("/evaluateInterview")
  .post(verifyTokenMiddleware, evaluateInterview);
router
  .route("/getCompletedInterviews")
  .get(verifyTokenFromQuery, getCompletedInterviews);
router
  .route("/getOngoingInterview")
  .get(verifyTokenFromQuery, getOngoingInterview);
router.route("/:id").get(verifyTokenFromQuery, getSingleInterview);
router.route("/report/:id").get(getInterviewReport);

export default router;
