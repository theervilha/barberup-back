import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./routes";
import * as Sentry from "@sentry/node";
import "./instrument";

const app = express();


app.use(express.json());
app.use("/api", router);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

// Middleware de erro sempre por último
app.use(errorHandler); 


export default app;
