import { Router } from "express";
import interveiwRoutes from "./Interview.js";
import userRoutes from "./User.js";
import { verifyTokenMiddleware } from "../token/verifyToken.js";
const router = Router();

router.use("/interview", interveiwRoutes);
router.use("/user", userRoutes);

export default router;
