import type { Request, Response, NextFunction } from "express";
import type { PoolConnection } from "mysql2/promise";

import utilities from "utilities";
import models from "models";
import settings from "settings";
import middleware from "middleware";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {}
