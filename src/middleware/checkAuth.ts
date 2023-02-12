import { Request, Response, NextFunction } from "express";
import HttpStatusCode from "../enums/HttpStausCode";
import jwt, { Secret } from "jsonwebtoken";
import { apiResponse } from "../helpers/ApiResponse";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET as Secret;

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    res.status(HttpStatusCode.UNAUTHORIZED);
    res.json(
      apiResponse(
        "",
        HttpStatusCode.UNAUTHORIZED,
        "Access denied, invalid token."
      )
    );

    return false;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    const UserData = jwt.verify(token, SECRET);

    // @ts-ignore
    global.userId = UserData.user.id as unknown as number;
  } catch (err) {
    console.error(err);

    res.json(
      apiResponse(
        "",
        HttpStatusCode.UNAUTHORIZED,
        "Access denied, invalid token."
      )
    );

    return false;
  }

  next();
}
