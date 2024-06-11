import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import imageRouter from "./routes/imageRoute";
import pdfParserRouter from "./routes/pdfParserRoute";
import handleError from "./exceptions/handleError";
import { validateApiKey } from "./middlewares/validateApiKey";
import { envConfig } from "./configs/config";
import { connectDB } from "./configs/connectDB";
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

// app.use(express.static(__dirname + "/public"));

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
app.use("/api/v1/parsers-pdf", validateApiKey, pdfParserRouter);

// Not found

app.use((req, res, next) => {
    const error = new handleError.ErrorResponse("Not found!", 404);
    next(error);
});

// handle error

app.use((error: any, req: Request, res: Response) => {
    const statusCode: number = error.statusCode || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message || "Internal Server Error",
    });
});

export default app;
