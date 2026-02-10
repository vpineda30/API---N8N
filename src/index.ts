import Express from "express";
import { GetProductsController } from "./controllers/products/get-products.controller.js";
import { CreateProductController } from "./controllers/products/create-product.controller.js";
import { UpdateProductController } from "./controllers/products/update-product.controller.js";
import { DeleteProductController } from "./controllers/products/delete-product.controller.js";
import { N8NController } from "./integrations/n8n/controllers/n8n.controller.js";
import { GetSaleDetailsController } from "./controllers/sales/get-sale-details.controller.js";
import { GetTotalOfSalesController } from "./controllers/sales/get-total-of-sales.controller.js";
import "dotenv/config";
import { SellProductController } from "./controllers/products/sell-product.controller.js";

const app = Express();
const port = process.env.PORT || 3304;

app.listen(port, () => console.log(`Server Running on Port ${port}`));
app.use(Express.json());

app.get("/products/", async (request, response) => {
    const controller = GetProductsController.builder();
    return await controller.handler(request, response);
});

app.post("/products/create-product", async (request, response) => {
    const controller = CreateProductController.builder();
    return await controller.handler(request, response);
});

app.put("/products/update-product/:id", async (request, response) => {
    const controller = UpdateProductController.builder();
    return await controller.handler(request, response);
});

app.delete("/products/delete-product/:id", async (request, response) => {
    const controller = DeleteProductController.builder();
    return await controller.handler(request, response);
});

app.post("/products/sell-product/:id", async (request, response) => {
    const controller = SellProductController.builder();
    return await controller.handler(request, response);
});

// Sales Endpoints
app.get("/sales/sales-details", async (request, response) => {
    const controller = GetSaleDetailsController.builder();
    return await controller.handler(request, response);
});

app.get("/sales/total-of-sales", async (request, response) => {
    const controller = GetTotalOfSalesController.builder();
    return await controller.handler(request, response);
});

// N8N integration Endpoints
app.get("/n8n/get-sales-report", async (request, response) => {
    const controller = N8NController.builder();
    return await controller.handler(request, response);
});