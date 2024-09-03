import { Router } from "express";
import { register, getUser, checkAuth, login } from "../controller/User.js";
import {
  registerValidationRules,
  validate,
} from "../validation/userValidation.js";
import { verifyTokenMiddleware } from "../token/verifyToken.js";

const router = Router();

router.route("/register").post(registerValidationRules(), validate, register);

router.route("/login").post(login);
router.route("/checkAuth").post(verifyTokenMiddleware, checkAuth);

export default router;
