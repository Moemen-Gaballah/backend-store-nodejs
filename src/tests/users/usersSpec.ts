import {BaseAuthUser as BaseUser, BaseAuthUser as AuthUser} from "../../models/user.model";
import HttpStatusCode from "../../enums/HttpStausCode";
import supertest from "supertest";
import jwt, {Secret} from "jsonwebtoken";
import {app} from "../../server";


const request = supertest(app);
const SECRET = process.env.JWT_SECRET as Secret;

describe("User Service", () => {

    const userInfo: AuthUser = {
        username: "moemenGaballa",
        email: "moemengaballa@gmail.com",
        password: "12345678",
    };

    let token: string, userId: number = 1;

    it("all Field is required", async () => {
        await request.post("/api/register").send({
            email: "moemengaballa@gmail.com"
        })
            .then((res) => {
                const {status} = res;

                expect(status).toBe(HttpStatusCode.BAD_REQUEST);
            });
    });

    it("all endpoint must be auth", async ()  => {
        request
            .get("/api/users")
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.UNAUTHORIZED)
            })

        request
            .get(`/api/users/${userId}`)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.UNAUTHORIZED)
            })

        request
            .put(`/api/users/${userId}`)
            .send({
                email: "bla@gmail.com",
            })
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.UNAUTHORIZED)
            })

        request
            .delete(`/api/users/${userId}`)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.UNAUTHORIZED)
            })
    })


    it("Register User", async () => {
        await request.post("/api/register").send(userInfo)
            .then((res) => {
                const {body, status} = res
                token = body.data as unknown as string;
                // @ts-ignore
                const {user} = jwt.verify(token, SECRET)
                userId = user.id as unknown as number;
                expect(status).toBe(HttpStatusCode.OK);
            });
    });

    it("gets the index endpoint", async () => {
        request
            .get("/api/users")
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    })

    it("show user", async () => {
        request
            .get(`/api/users/${userId}`)
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    })

    it("update user", async () => {
        const newUserData: AuthUser = {
            ...userInfo,
            username: "mohsen",
        }

        request
            .put(`/api/users/${userId}`)
            .send(newUserData)
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    })

    it("login", async () => {
        request
            .post("/api/login")
            .send({
                email: userInfo.email,
                password: userInfo.password
            })
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    })// end test login correct data

    it("login Expect token", async () => {
        request
            .post("/api/login")
            .send({
                email: userInfo.email,
                password: userInfo.password
            })
            .then((res) => {
                expect(res.body.token).not.toBeNull();
            })
    })// end test login correct data

    it("login with invalid credential", async () => {
        request
            .post("/api/login")
            .send({
                username: userInfo.username,
                password: "wrongPassword"
            })
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.BAD_REQUEST)
            })
    })// end test login with invalid credential

    it("delete user", async () => {
        request
            .delete(`/api/users/${userId}`)
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    }) // end test delete user


});
