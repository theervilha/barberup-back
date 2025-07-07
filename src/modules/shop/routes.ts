import { Router } from "express";
import {
  findAllShops,
  findShopById,
  createShop,
  updateShop,
  deleteShop,
} from "./controller";

const router = Router();

router.get("/", findAllShops);
router.get("/:id", findShopById);
router.post("/", createShop);
router.put("/:id", updateShop);
router.delete("/:id", deleteShop);

export default router;
