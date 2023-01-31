import {Application, Request, Response} from "express"
import {checkAuth} from "../middleware/checkAuth";
import { register, login } from "../handlers/user.handler";



export default function appRoutes (app: Application) {
    // app.get("/users", checkAuth, register)
    app.post("/api/register", register)
    app.post("/api/login", login)
    // app.get("/users/:id", checkAuth, read)
    // app.put("/users/:id", checkAuth, update)
    // app.delete("/users/:id", checkAuth, deleteUser)
    // app.post("/users/auth", authenticate)



}
