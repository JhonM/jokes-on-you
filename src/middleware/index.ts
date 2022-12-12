import { Response, Request, NextFunction } from "express";
import { ErrorStatus } from "../types";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info(req);
  next();
};

export const requireJsonContent = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.headers["content-type"] !== "application/json") {
    response.status(400).send("Server require application/json");
  } else {
    next();
  }
};

export const errorLogger = (
  err: ErrorStatus,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`error ${err.message}`);
  next(err);
};

export const errorResponder = (
  err: ErrorStatus,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.header("Content-Type", "application/json");

  response.status(err.statusCode).send(err.message);
};

export const invalidPathHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(400);
  return response.send({ status: 400 });
};
