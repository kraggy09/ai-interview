import express from "express";
import path from "path";

import dotenv from "dotenv";
import interviewRoter from "./routes/Interview.js";

const app = express();
dotenv.config({
  path: path.resolve("backend", "config", "config.env"),
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(process.env.GEMINI_API_KEY);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/interview", interviewRoter);

export default app;
