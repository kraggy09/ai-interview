import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config({
  path: "../backend/config/config.env",
});

console.log(process.env.GEMINI_API_KEY);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

export default app;
