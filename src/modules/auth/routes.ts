import { Router } from "express";
import { login, register, verify } from "./controller";
import { validateBody } from "../../middlewares/validationMiddleware";
import { AuthInputSchema } from "./validators/auth.schema";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/register", validateBody(AuthInputSchema), register);
router.post("/login", validateBody(AuthInputSchema), login);
router.get("/verify", authMiddleware, verify);

export default router;
