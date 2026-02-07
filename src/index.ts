import Express from "express";
import { GetProductsController } from "./controllers/products/get-products.controller.js";
import { CreateProductController } from "./controllers/products/create-product.controller.js";
import { N8NController } from "./integrations/n8n/controllers/n8n.controller.js";
import "dotenv/config";

const app = Express();
const port = process.env.PORT || 3304;

app.listen(port, () => console.log(`Server Running on Port ${port}`));
app.use(Express.json());

app.get("/products", async (request, response) => {
    const controller = GetProductsController.builder();
    return await controller.handle(request, response);
});

app.post("/create-product", async (request, response) => {
    const controller = CreateProductController.builder();
    return await controller.handle(request, response);
});

app.get("/send-products-n8n", async (request, response) => {
    const controller = N8NController.builder();
    return await controller.handler(request, response);
});