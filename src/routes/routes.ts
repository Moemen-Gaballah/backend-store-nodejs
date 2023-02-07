import {Application, Request, Response} from "express"
import {checkAuth} from "../middleware/checkAuth";
import { register, login } from "../handlers/user.handler";
import { index as getProducts,  store as addProduct, show as showProduct, update as updateProduct, destroy as destroyProduct} from "../handlers/product.handler";
import { index as getOrders, store as addOrder, show as showOrder, update as updateOrder, destroy as destroyOrder } from "../handlers/order.handler";



export default function appRoutes (app: Application) {

    // landing page
    app.get('/', function (req: Request, res: Response) {
        res.send('Hello World!')
    });

    // check health
    app.get('/healthz', function (req: Request, res: Response) {
        res.send({status: 'OK'})
    });

    // Authentication
    // app.get("/users", checkAuth, register)
    app.post("/api/register", register)
    app.post("/api/login", login)
    // app.get("/users/:id", checkAuth, read)
    // app.put("/users/:id", checkAuth, update)
    // app.delete("/users/:id", checkAuth, deleteUser)
    // app.post("/users/auth", authenticate)

    // Products
    app.get("/api/products", getProducts)
    app.post("/api/products/create", checkAuth, addProduct)
    app.get("/api/products/:id", showProduct)
    app.put("/api/products/:id", checkAuth, updateProduct)
    app.delete("/api/products/:id", checkAuth, destroyProduct)


    // Orders
    app.get("/api/orders", checkAuth, getOrders)
    app.post("/api/orders/create", checkAuth, addOrder)
    app.get("/api/orders/:id", checkAuth, showOrder)
    app.put("/api/orders/:id", checkAuth, updateOrder)
    app.delete("/api/orders/:id", checkAuth, destroyOrder)


}
