import {BaseOrder, Order, OrderModel} from "../../models/order.model"
import {User, UserModel} from "../../models/user.model"
import {Product, ProductModel} from "../../models/product.model"

const orderModelInstance = new OrderModel()

describe("Order Model", () => {
    const UserStoreInstance = new UserModel()
    const ProductStoreInstance = new ProductModel()

    let order: BaseOrder, user_id: number, product_id: number

    it("should have an index method", () => {
        expect(orderModelInstance.index).toBeDefined()
    })

    it("should have a show method", () => {
        expect(orderModelInstance.show).toBeDefined()
    })

    it("should have a store method", () => {
        expect(orderModelInstance.store).toBeDefined()
    })

    it("should have a destroy method", () => {
        expect(orderModelInstance.destroy).toBeDefined()
    })
})
