import HttpStatusCode from "../../enums/HttpStausCode";
import supertest from "supertest";
import {app} from "../../server";
import {BaseAuthUser as BaseUser} from "../../models/user.model";
import {BaseProduct} from "../../models/product.model";
import {BaseOrder} from "../../models/order.model";
import jwt, {Secret} from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as Secret;

const request = supertest(app);

describe("Orders", () => {

    let token: string, order: BaseOrder, userId: number, product_id: number, order_id: number

    beforeAll(async () => {
        const createUser: BaseUser = {
            username: "userorder",
            email: "userorder@gmail.com",
            password: "12345678"
        }
        const productData: BaseProduct = {
            name: "ProductOrder",
            price: 150
        }

        const {body: userResponse} = await request.post("/api/register").send(createUser)

        token = userResponse.data as unknown as string

        // @ts-ignore
        const {user} = jwt.verify(token, SECRET)
        userId = user.id as unknown as number

        const {body: productResponse} = await request.post("/api/products/create").set("Authorization", "bearer " + token).send(productData)
        product_id = productResponse.data.id as unknown as number;

        order = {
            products: [{
                product_id,
                quantity: 5
            }],
            user_id: userId,
            status: true
        }
    })

    it("create order", async () => {
        request
            .post("/api/orders/create")
            .send(order)
            .set("Authorization", "bearer " + token)
            .then((res) => {
                const {body, status} = res

                expect(status).toBe(HttpStatusCode.OK)

                order_id = body.data.id as unknown as number
            })
    })


    it("getAllOrders", async () => {
        await request.get("/api/orders")
            .set("Authorization", "bearer " + token)
            .then((res) => {

                const {status} = res;
                expect(status).toBe(HttpStatusCode.OK);
            });
    });

    it("show order", async () => {
        request
            .get(`/api/orders/${order_id}`)
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    })


    it("show order", async () => {
        request
            .get(`/api/orders/${order_id}`)
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    })


    it("Assert UserId", async () => {
        request
            .get(`/api/orders/${order_id}`)
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.body.data.user_id).toEqual(userId);
            })
    })

    it("update order", async () => {
        const updateOrder: BaseOrder = {
            ...order,
            status: false
        }

        request
            .put(`/api/orders/${order_id}`)
            .send(updateOrder)
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    })

    it("delete order", async () => {
        request.delete(`/api/orders/${order_id}`).set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(HttpStatusCode.OK)
            })
    })


    // end test delete user and products
    afterAll(async () => {
        await request.delete(`/api/products/${product_id}`).set("Authorization", "bearer " + token)

        await request.delete(`/api/users/${userId}`).set("Authorization", "bearer " + token)
    })


});
