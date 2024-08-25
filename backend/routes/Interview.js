import express from "express";
import {
  evaluateInterview,
  generateInterview,
} from "../controller/Interview.js";

const router = express.Router();

router.route("/newInterview").post(generateInterview);
router.route("/evaluateInterview").post(evaluateInterview);

export default router;
