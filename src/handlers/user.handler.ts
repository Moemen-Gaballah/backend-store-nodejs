import {Application, Request, Response} from "express"
import HttpStatusCode from "../enums/HttpStausCode";
import {User, UserModel, getTokenByUser} from "../models/user.model";
import {apiResponse} from "../helpers/ApiResponse";

const userModelInstance = new UserModel();

export const register = async (req: Request, res: Response) => {
    try {
        const username = req.body.username as unknown as string;
        const email = req.body.email as unknown as string;
        const password = req.body.password as unknown as string;

        if (username === undefined || email === undefined || password === undefined) {
            res.status(HttpStatusCode.BAD_REQUEST)
            res.send("All field (:username, :email, :password) is required.");
            return false
        }

        const user: User = await userModelInstance.register({username, email,password})

        res.json(apiResponse(getTokenByUser(user), HttpStatusCode.OK, "Register Successfully."))
    } catch (e) {

        // @ts-ignore
        res.json(apiResponse("", HttpStatusCode.BAD_REQUEST, "Email Already Exist."));
    }
} // end function register


export const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email as unknown as string;
        const password = req.body.password as unknown as string;

        if (email === undefined || password === undefined) {
            res.status(HttpStatusCode.BAD_REQUEST)
            res.send("All field (:email, :password) is required");
            return false
        }

        const user: User | null = await userModelInstance.login(email, password)

        if (user === null) {
            res.status(HttpStatusCode.UNAUTHORIZED)
            res.send(apiResponse(null, HttpStatusCode.UNAUTHORIZED, 'Invalid credentials'));

            return false
        }

        res.json(apiResponse({'token': getTokenByUser(user)}, HttpStatusCode.OK, "Login Successfully."));

    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST)
        console.log(`Error: ${e}`);
        // res.json(e)
        res.json(apiResponse("", HttpStatusCode.BAD_REQUEST, "Invalid credentials"));
    }

} // end method login
