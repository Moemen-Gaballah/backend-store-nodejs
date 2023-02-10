import {BaseAuthUser as AuthUser} from "../../models/user.model";
import HttpStatusCode from "../../enums/HttpStausCode";
import supertest from "supertest";
import {app} from "../../server";

const request = supertest(app);

describe("Products", () => {

    it("getAllProducts", async () => {
        await request.get("/api/orders")
            .then((res) => {

                const {status} = res;
                expect(status).toBe(HttpStatusCode.OK);
            });
    });
});
