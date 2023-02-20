import { Request, Response } from "express";
import { readFileSync } from "fs";
import { env } from "./env-vars";
import { logger } from "./logger";

export const Config = {
  env: env,
  logger: logger,
};

export function sendFavicon(req: Request, res: Response): void {
  res.statusCode = 200;
  res.send(readFileSync("/favicon/favicon.ico"));
  res.end();
}
