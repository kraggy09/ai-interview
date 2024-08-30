import { Router } from "express";
import interveiwRoutes from "./Interview.js";
import userRoutes from "./User.js";
import { checkAuth } from "../middlewares/checkAuth.js";
const router = Router();

router.use("/interview", checkAuth, interveiwRoutes);
router.use("/user", userRoutes);

export default router;