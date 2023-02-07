import { BaseAuthUser as AuthUser } from "../../models/user.model";
import HttpStatusCode from "../../enums/HttpStausCode";
import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import { app } from "../../server";
const request = supertest(app);
const SECRET = process.env.JWT_SECRET as Secret;

describe("Register User", () => {
  const userInfo: AuthUser = {
    username: "moemenGaballa",
    email: "moemengaballa@gmail.com",
    password: "12345678",
  };

  it("Register User", (done) => {
    request
      .post("/api/register")
      .send(userInfo)
      .then((res) => {
        const { body, status } = res;
        let token = body;

        // @ts-ignore
        const { user } = jwt.verify(token, SECRET);
        let userId = user.id as unknown as number;

        expect(status).toBe(HttpStatusCode.OK);
        done();
      });
  });
});
