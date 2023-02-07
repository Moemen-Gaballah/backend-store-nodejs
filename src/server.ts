import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import appRoutes from "./routes/routes";

// import dotenv from 'dotenv'
// dotenv.config()

const PORT = process.env.PORT || 3000;
const address: string = `http://localhost:${PORT}`

const app = express();

app.use(express.json())

appRoutes(app)

app.get('/healthz', function (req: Request, res: Response) {
    res.send({status: 'OK'})
})

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(PORT,  () => {
    console.log(`starting app on: ${address}`)
});
