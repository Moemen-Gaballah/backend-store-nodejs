import {Application, Request, Response} from "express"
import HttpStatusCode from "../enums/HttpStausCode";
import {Order, OrderModel, OrderProduct} from "../models/order.model";
import {apiResponse} from "../helpers/ApiResponse";

const orderModelInstance = new OrderModel();

export const index = async (req: Request, res: Response) => {
    try {
        const orders: Order[] = await orderModelInstance.index()

        res.json(apiResponse(orders, HttpStatusCode.OK))
    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST)
        res.json(e)
    }
} // end fun index


export const store = async (req: Request, res: Response) => {
    try {
        let products = req.body.products as unknown as OrderProduct[]
        const status = req.body.status as unknown as boolean
        const user_id = req.body.user_id as unknown as number; // todo auth id if not admin

        if (products === undefined || status === undefined || user_id === undefined) {
            res.status(HttpStatusCode.BAD_REQUEST)

            res.json(apiResponse("", HttpStatusCode.BAD_REQUEST, "All field (:products, :status, :user_id) is required!"))

            return false
        }

        const order: Order = await orderModelInstance.store({products, status, user_id})

        res.json(order)
    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST)
        res.json(e)
    }
} // end fun store


export const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number

        if (id === undefined) {
            res.status(HttpStatusCode.BAD_REQUEST)
            res.json(apiResponse("", HttpStatusCode.BAD_REQUEST, "The field ( :id) is required!"))
            return false
        }

        const order: Order = await orderModelInstance.show(id)

        res.json(order)
    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST)
        res.json(e)
    }
} // end fun show


export const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number
        let products = req.body.products as unknown as OrderProduct[]
        const status = req.body.status as unknown as boolean
        const user_id = req.body.user_id as unknown as number

        if (products === undefined || status === undefined || user_id === undefined || id === undefined) {
            res.status(HttpStatusCode.BAD_REQUEST)
            res.json(apiResponse("", HttpStatusCode.BAD_REQUEST, "All field ( :products, :status, :user_id, :id) is required!"))
            return false
        }

        const order: Order = await orderModelInstance.update(id, {products, status, user_id})

        res.json(order)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}// end fun update order

export const destroy = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number

        if (id === undefined) {
            res.status(HttpStatusCode.BAD_REQUEST)
            res.json(apiResponse("", HttpStatusCode.BAD_REQUEST, "The field (:id) is required!"))

            return false
        }

        await orderModelInstance.destroy(id)

        res.json(apiResponse("", HttpStatusCode.OK, "Deleted successfully."))
    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST)
        res.json(e)
    }
} // end fun destroy

