import {Request, Response, NextFunction} from "express"
import HttpStatusCode from "../enums/HttpStausCode";
import jwt, {Secret} from "jsonwebtoken"

const SECRET = process.env.TOKEN_SECRET as Secret

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        res.status(HttpStatusCode.UNAUTHORIZED)
        res.json("Access denied, invalid token")

        return false;
    }

    try {
        const token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, SECRET)

        next()
    } catch (err) {
        console.error(err)

        res.status(401)
        res.json("Access denied, invalid token")

        return false
    }

    next();
}