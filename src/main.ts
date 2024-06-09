import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./configs/connectDB";
import imageRouter from "./routes/imageRoute";
import handleError from "./utils/handleError";

import { validateApiKey } from "./middlewares/validateApiKey";

import { envConfig } from "./configs/config";


const app: Application = express();

// Init middlewares
app.use(
    cors({
        origin: [envConfig.corsOrigin],
        credentials: true,
    })
);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// connect Db
connectDB.connect();
// connectDB();

// init routes

app.get("/health", (req: Request, res: Response) => {
    res.json({
        message: "Server is running...",
    });
});

app.use("/api/v1", validateApiKey, imageRouter);

// Not found

app.use((req, res, next) => {
    const error = new handleError.ErrorResponse("Not found!", 404);
    next(error);
});

// handle error

app.use((error: any, req: Request, res: Response, next: any) => {
    const statusCode: number = error.statusCode || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message || "Internal Server Error",
    });
});

export default app;
