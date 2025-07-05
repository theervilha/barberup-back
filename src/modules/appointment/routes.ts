import { Router } from "express";
import { getAppointmentById } from "./controller";

const router = Router();

router.get("/:id", getAppointmentById);

export default router;
