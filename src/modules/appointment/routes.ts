import { Router } from "express";
import {
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "./controller";

const router = Router();

router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
