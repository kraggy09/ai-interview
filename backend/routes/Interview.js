import express from "express";
import { generateInterview } from "../controller/Interview.js";

const router = express.Router();

router.route("/newInterview").post(generateInterview);

export default router;
