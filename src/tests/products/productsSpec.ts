import HttpStatusCode from "../../enums/HttpStausCode";
import supertest from "supertest";
import {app} from "../../server";
import {BaseAuthUser as BaseUser} from "../../models/user.model";
import {BaseProduct} from "../../models/product.model";
import jwt, {Secret} from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as Secret;

const request = supertest(app);

describe("Products", () => {

    const product: BaseProduct = {
        name: "Product01",
        price: 200
    }

    let token: string, user_id: number, product_id: number

    beforeAll(async () => {
        const createUser: BaseUser = {
            username: "userproduct",
            email: "userproduct@gmail.com",
            password: "12345678"
        }

        const {body: userResponse} = await request.post("/api/register").send(createUser)

        token = userResponse.data;

        // @ts-ignore
        const {user} = jwt.verify(token, SECRET)
        user_id = user.id as unknown as number
    })


    it("getAllProducts", async () => {
        await request.get("/api/products")
            .then((res) => {
                const {status} = res;
                expect(status).toBe(HttpStatusCode.OK);
            });
    });

    it("store product", (done) => {
        request
            .post("/api/products/create")
            .send(product)
            .set("Authorization", "bearer " + token)
            .then((res) => {
                const {body, status} = res

                expect(status).toBe(HttpStatusCode.OK)
                product_id = body.data.id as unknown as number;
                done()
            })
    })


    it("show product", (done) => {
        request
            .get(`/api/products/${product_id}`)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
                done()
            })
    })

    it("update product", (done) => {
        const newProductData: BaseProduct = {
            ...product,
            name: "updateProduct",
            price: 400
        }

        request
            .put(`/api/products/${product_id}`)
            .send(newProductData)
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
                done()
            })
    })

    it("delete product", (done) => {
        request.delete(`/api/products/${product_id}`).set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })


    // end test delete user and products
    afterAll(async () => {
        await request.delete(`/api/users/${user_id}`).set("Authorization", "bearer " + token)
        await request.delete(`/api/products/${product_id}`).set("Authorization", "bearer " + token)
    })


});
