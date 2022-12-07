import express, { Express } from "express";
import path from "path";

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
app.use(routes);

app.use(helmet());
app.use("/*", globalRateLimiter);

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

export default app;
