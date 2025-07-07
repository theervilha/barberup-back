import { Router } from "express";
import authRoutes from "../modules/auth/routes";
import appointmentRoutes from "../modules/appointment/routes";
import shopRoutes from "../modules/shop/routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/shop", shopRoutes);

router.get("", (req, res) => {
  res.json({ message: "Hello world!" });
});

export default router;
