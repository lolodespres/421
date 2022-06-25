import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { appendFile } from 'fs'
import * as CONF from './config'
import devRouter from "./routers/Dev.router"

// import { ExceptionsHandler } from '~/middlewares/exceptions.handler'
// import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler'
const PORT = 8080


const app = express();
app.use(express.json());
app.use(cors(CONF.CORS));
app.use("/dev", devRouter);
CONF.connectDB();


app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json("hello world");
})


app.listen(PORT, () => console.log(`app running on port ${PORT}`))