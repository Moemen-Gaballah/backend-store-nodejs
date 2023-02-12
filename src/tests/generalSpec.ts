import HttpStatusCode from "../enums/HttpStausCode";
import supertest from "supertest";
import {app} from "../server";

const request = supertest(app);

describe("general endpoint - healthy", () => {

    it("healthz", async ()  => {
        request
            .get("/healthz")
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    })

    it("landing page", async () => {
        request
            .get("/")
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    });

});
