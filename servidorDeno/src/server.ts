import { Application, config } from "../depts.ts";
import { userRouter } from "./routes/user.routes.ts";
import { productRouter } from "./routes/product.routes.ts";

const {PORT} = config();
const port = parseInt(PORT);

const app = new Application();

app.use(userRouter.routes());
app.use(productRouter.routes());

app.listen({port});
console.log(`Server listening on port ${PORT}`);