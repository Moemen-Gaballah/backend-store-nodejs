import {BaseAuthUser as AuthUser} from "../../models/user.model";
import HttpStatusCode from "../../enums/HttpStausCode";
import supertest from "supertest";
import jwt, {Secret} from "jsonwebtoken";
import {app} from "../../server";

const request = supertest(app);
const SECRET = process.env.JWT_SECRET as Secret;

describe("User Service", () => {

    it("all Field is required", async () => {
        await request.post("/api/register").send({
            email: "moemengaballa@gmail.com",
            password: "12345678",
        })
            .then((res) => {
                const {status} = res;

                expect(status).toBe(HttpStatusCode.BAD_REQUEST);
            });
    });

    const userInfo: AuthUser = {
        username: "moemenGaballa",
        email: "moemengaballa@gmail.com",
        password: "12345678",
    };

    it("Register User", async () => {
        await request.post("/api/register").send(userInfo)
            .then((res) => {
                const {status} = res;

                // TODO Jwt token verify

                expect(status).toBe(HttpStatusCode.OK);
            });
    });

});
