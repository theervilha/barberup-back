import { Router } from "express";
import {
  findServiceById,
  createService,
  updateService,
  deleteService,
} from "./controller";

const router = Router();

router.get("/:id", findServiceById);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
