import express from "express";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
import passport from "passport";
import "./strategies/localstrategry.js";
import cors from "cors";

import connection from "./db/dbConfig.js";

import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app = express();
dotenv.config({
  path: path.resolve("backend", "config", "config.env"),
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: "https://ai-intervue.vercel.app", // Your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://ai-intervue.vercel.app"
//   ); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const uri = process.env.MONGO_URI;

connection(uri);

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", router);

export default app;
