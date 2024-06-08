import { devConfig } from "./configs/config";
import app from "./main";
const port: number = devConfig.port || 8000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
