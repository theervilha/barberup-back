import { Router } from "express";
import authRoutes from "../modules/auth/routes";

const router = Router();

router.use("/auth", authRoutes);

router.get("", (req, res) => {
  res.json({ message: "Hello world!" });
});

export default router;
