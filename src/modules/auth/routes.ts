import { Router } from "express";
import { helloAuth, register } from "./controller";

const router = Router();

router.get("/hello", helloAuth);
//router.get("/register", register);
//router.post("/login", login);

export default router;
