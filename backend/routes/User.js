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
router
  .route("/login")
  .post(passport.authenticate("local"), async (req, res) => {
    const id = req.user;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      msg: "Authenticated successfull",
      success: true,
      user,
    });
  });

router.route("/getUser").get(getUser);

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
