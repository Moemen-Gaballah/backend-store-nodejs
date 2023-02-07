import express from 'express'
import appRoutes from "./routes/routes";

// import dotenv from 'dotenv'
// dotenv.config()

const PORT = process.env.PORT || 3000;
const address: string = `http://localhost:${PORT}`

const app = express();

app.use(express.json())

appRoutes(app)


app.listen(PORT,  () => {
    console.log(`starting app on: ${address}`)
});
