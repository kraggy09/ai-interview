import express from "express";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import cors from "cors";
import connection from "./db/dbConfig.js";

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

// CORS Configuration
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

// Handle Preflight Requests
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.status(204).send("");
  }
  next();
});

const uri = process.env.MONGO_URI;
connection(uri);

app.use("/api/v1", router);

export default app;
