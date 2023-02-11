import {Request, Response} from "express";
import HttpStatusCode from "../enums/HttpStausCode";
import {User, UserModel, getTokenByUser} from "../models/user.model";
import {apiResponse} from "../helpers/ApiResponse";

const userModelInstance = new UserModel();

export const register = async (req: Request, res: Response) => {
    try {
        const username = req.body.username as unknown as string;
        const email = req.body.email as unknown as string;
        const password = req.body.password as unknown as string;

        if (
            username === undefined ||
            email === undefined ||
            password === undefined
        ) {
            res.status(HttpStatusCode.BAD_REQUEST);
            return res.json(
                apiResponse(
                    "",
                    HttpStatusCode.BAD_REQUEST,
                    "All field (:username, :email, :password) is required."
                )
            );

            // return false;
        }

        const user: User = await userModelInstance.register({
            username,
            email,
            password,
        });

        res.status(HttpStatusCode.OK);
        res.json(
            apiResponse(
                getTokenByUser(user),
                HttpStatusCode.OK,
                "Register Successfully."
            )
        );
    } catch (e) {
        console.log(`Error ${e}`);
        res.json(
            apiResponse("", HttpStatusCode.BAD_REQUEST, "Email Already Exist.")
        );
    }
}; // end function register

export const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email as unknown as string;
        const password = req.body.password as unknown as string;

        if (email === undefined || password === undefined) {
            res.status(HttpStatusCode.BAD_REQUEST);
            res.json(
                apiResponse(
                    "",
                    HttpStatusCode.BAD_REQUEST,
                    "All field (:email, :password) is required"
                )
            );

            return false;
        }

        const user: User | null = await userModelInstance.login(email, password);

        if (user === null) {
            res.status(HttpStatusCode.UNAUTHORIZED);
            res.send(
                apiResponse(null, HttpStatusCode.UNAUTHORIZED, "Invalid credentials")
            );

            return false;
        }

        res.json(
            apiResponse(
                {token: getTokenByUser(user)},
                HttpStatusCode.OK,
                "Login Successfully."
            )
        );
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(HttpStatusCode.BAD_REQUEST);
        res.json(
            apiResponse(
                "",
                HttpStatusCode.BAD_REQUEST,
                "Something wrong happened Or Invalid credentials"
            )
        );
    }
}; // end method login


export const index = async (req: Request, res: Response) => {
    try {
        const users: User[] = await userModelInstance.index()

        res.status(HttpStatusCode.OK);
        res.json(apiResponse(users,HttpStatusCode.OK,"All Users."));
    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST);
    }
} // end method index


export const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number


        if (id === undefined) {
            res.status(HttpStatusCode.BAD_REQUEST);
            res.json(
                apiResponse(
                    "",
                    HttpStatusCode.BAD_REQUEST,
                    "The field (:id) is required"
                )
            );
            return false;
        }

        const user: User = await userModelInstance.show(id)

        res.status(HttpStatusCode.OK);
        res.json(apiResponse(user, HttpStatusCode.OK));
    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST)
        res.json(e)
    }
} // end method show


export const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number
        const username = req.body.username as unknown as string

        if (username === undefined || id === undefined) {
            res.status(HttpStatusCode.BAD_REQUEST)
            res.json(
                apiResponse(
                    "",
                    HttpStatusCode.BAD_REQUEST,
                    "The field (:id) is required"
                )
            );            return false
        }

        const user: User = await userModelInstance.update(id, username)

        res.status(HttpStatusCode.OK);
        res.json(apiResponse(user, HttpStatusCode.OK));
    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST)
        res.json(e)
    }
} // end method destroy

export const destroy = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number

        if (id === undefined) {
            res.status(HttpStatusCode.BAD_REQUEST)
            res.send("The field (:id) is required.");
            return false
        }

        await userModelInstance.destroy(id)

        res.json(apiResponse('', HttpStatusCode.OK, "User Deleted Successfully."));
    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST)
        res.json(e)
    }
}


