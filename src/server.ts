import { envConfig } from "./configs/config";
import app from "./main";
import * as dotenv from "dotenv";
dotenv.config();

const port: number = envConfig.port || 8000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
