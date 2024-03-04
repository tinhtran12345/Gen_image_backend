import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { devConfig } from "./configs/config";
import { connectDB } from "./configs/connectDB";

const app: Application = express();

const port = devConfig.port || 8000;

// Init middlewares
app.use(cors());
app.use(express());

// connect Db
connectDB();

// app.use("/health", (req: Request, res: Response) => {
//     res.send("Server is running...");
// });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
