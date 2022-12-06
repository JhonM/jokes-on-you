import { Server } from "http";
import dotenv from "dotenv";
import app from "./app";
import logger from "./utils/logger";

dotenv.config();

const port: string = process.env.PORT || "3000";
const server: Server = new Server(app);

server.listen(port, () => {
  logger.debug(`[server]: Server is running at http://localhost:${port}`);
});
