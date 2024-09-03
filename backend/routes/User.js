import { Router } from "express";
import { register, getUser } from "../controller/User.js";
import {
  registerValidationRules,
  validate,
} from "../validation/userValidation.js";
import passport from "passport";
import User from "../model/User.js";

const router = Router();

router.route("/register").post(registerValidationRules(), validate, register);
router.route("/getUser").get(getUser);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return next(err); // Pass errors to the error-handling middleware
    }
    if (!user) {
      return res.status(401).json({ msg: info.message, success: false }); // Handle errors with custom messages
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err); // Pass errors to the error-handling middleware
      }
      const userData = await User.findById(user).select("-password");
      return res.status(200).json({
        msg: "Authenticated successfully",
        success: true,
        user: userData,
      });
    });
  })(req, res, next);
});
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error destroying session" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
});
router.route("/checkAuth").get((req, res) => {
  console.log("Inside Checking of Auth");

  console.log(req.session);
  const user = req.user;

  return user
    ? res
        .status(200)
        .json({ success: true, msg: "You are authenticated", user })
    : res.status(401).json({
        success: false,
        msg: "You are not authenticaated",
      });
});

export default router;
