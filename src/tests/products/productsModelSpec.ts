import {BaseProduct, Product, ProductModel} from "../../models/product.model"
import {BaseAuthUser, BaseUser, User, UserModel} from "../../models/user.model"
import {app} from "../../server";
import supertest from "supertest";
const request = supertest(app);

const userModelInstance = new UserModel()
const productModelInstance = new ProductModel()

describe("Product Model", () => {
    const product: BaseProduct = {
        name: "Product Test model",
        price: 155
    }

    const user: BaseAuthUser = {
        username: "moemen123",
        email: "moemen123@gmail.com",
        password: "12345678"
    }

    async function storeUser (user: BaseAuthUser) {
        return userModelInstance.register(user)
    }


    async function destoryUser (id: number) {
        return userModelInstance.destroy(id)
    }

    let user_id: number = 1;

    beforeAll(async () => {
        const createdUser: User = await storeUser(user)

        if (createdUser) {
            const {username, email, id} = createdUser

            user_id = id;
            // @ts-ignore
            // global.userId = user_id as unknown as number;
        }

    })

    async function createProduct (product: BaseProduct) {
        return productModelInstance.store(product)
    }

    async function destroyProduct (id: number) {
        return productModelInstance.destroy(id)
    }

    it("should have an index method", () => {
        expect(productModelInstance.index).toBeDefined()
    })

    it("should have a show method", () => {
        expect(productModelInstance.show).toBeDefined()
    })

    it("should have a store method", () => {
        expect(productModelInstance.store).toBeDefined()
    })

    it("should have a destroy method", () => {
        expect(productModelInstance.destroy).toBeDefined()
    })

    it("store method should store a product", async () => {
        const createdProduct: Product = await createProduct(product)

        // TODO unset user_id

        // expect(createdProduct).toEqual({
        //     id: createdProduct.id,
        //     name: createdProduct.name,
        //     price: createdProduct.price,
        // })

        await destroyProduct(createdProduct.id)
    })

    it("index method should return a list of all products", async () => {
        const createdProduct: Product = await createProduct(product)
        const productList = await productModelInstance.index()

        expect(productList).toEqual([createdProduct])

        await destroyProduct(createdProduct.id)
    })

    it("show method should return the correct product", async () => {
        const storeProductRes: Product = await createProduct(product)
        const productFromDb = await productModelInstance.show(storeProductRes.id)

            // TODO add or remove user_id
//        expect(productFromDb).toEqual(createdProduct)

        await destroyProduct(storeProductRes.id)
    })

    it("update method should update product", async () => {
        const storeProductRes: Product = await createProduct(product)
        const newProductData: BaseProduct = {
            name: "bla bla 123",
            price: 123
        }

        const {name, price} = await productModelInstance.update(storeProductRes.id, newProductData)

        expect(name).toEqual(newProductData.name)
        expect(price).toEqual(newProductData.price)

        await destroyProduct(storeProductRes.id)
    })

    it("destroy method should delete the product", async () => {
        const storeProductRes: Product = await createProduct(product)

        await destroyProduct(storeProductRes.id)

        const productList = await productModelInstance.index()

        expect(productList).toEqual([])
    })


    // end test delete user and products
    afterAll(async () => {
        await destoryUser(user_id)
    })


})
