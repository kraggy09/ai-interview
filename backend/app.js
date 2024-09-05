import express from "express";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/routes.js";

import cors from "cors";
import connection from "./db/dbConfig.js";
import mongoose from "mongoose";

const app = express();
dotenv.config({
  path: path.resolve("backend", "config", "config.env"),
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-intervue.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const uri = process.env.MONGO_URI;

connection(uri);

app.use("/api/v1", router);

export default app;
