import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { devConfig } from "./configs/config";
import { connectDB } from "./configs/connectDB";
import imageRouter from "./routes/imageRoute";

const app: Application = express();

const port: number = devConfig.port || 8000;

// Init middlewares
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// connect Db
connectDB();

// init routes

app.use("/api/v1", imageRouter);

// handle error

app.use((error: any, req: Request, res: Response, next: any) => {
    const statusCode: number = error.statusCode || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message || "Internal Server Error",
    });
});

// app.use("/health", (req: Request, res: Response) => {
//     res.send("Server is running...");
// });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
