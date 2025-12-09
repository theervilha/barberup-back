import { Router } from "express";
import { helloAuth, register } from "./controller";
import { validateBody } from "../../middlewares/validationMiddleware";
import { AuthInputSchema } from "./validators/auth.schema";

const router = Router();

router.get("/hello", helloAuth);
router.post("/register", validateBody(AuthInputSchema), register);
//router.post("/login", login);

export default router;
