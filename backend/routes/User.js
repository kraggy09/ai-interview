import { Router } from "express";
import { register } from "../controller/User.js";
import {
  registerValidationRules,
  validate,
} from "../validation/userValidation.js";
import passport from "passport";

const router = Router();

router.route("/register").post(registerValidationRules(), validate, register);
router.route("/login").post(passport.authenticate("local"), (req, res) => {
  return res.status(200).json({
    msg: "Authenticated successfull",
    success: true,
  });
});

router.route("/checkAuth").get((req, res) => {
  console.log("Inside Checking of Auth");
  console.log(req.session);
  console.log(req.user);

  return req.user
    ? res.status(200).json({ success: true, msg: "You are authenticated" })
    : res.status(401).json({
        success: false,
        msg: "You are not authenticaated",
      });
});

export default router;
