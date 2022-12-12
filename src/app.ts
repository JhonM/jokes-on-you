import express, { Express, Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";

import helmet from "helmet";
import rateLimit, { MemoryStore } from "express-rate-limit";
import routes from "./routes";
import {
  requestLogger,
  errorLogger,
  errorResponder,
  invalidPathHandler,
} from "./middleware";

const app: Express = express();
const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: false,
  store: new MemoryStore(),
});

app.use(requestLogger);
app.use(express.static(path.join(__dirname, "../frontend", "dist")));

app.use(bodyParser.json());
app.use(routes);

app.get("*", (_: Request, response: Response) => {
  response.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.use(helmet());
app.use("/*", globalRateLimiter);

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

export default app;
