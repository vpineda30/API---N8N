import { Request, Response } from "express";
import { GetProductsService } from "../../services/products/get-products.service.js";
import { ProductRepository } from "../../repositories/products/sqlite_product.repository.js";

export class GetProductsController {
    constructor(private readonly getProductsService: GetProductsService) { }

    public static builder(): GetProductsController {
        const repository = new ProductRepository();
        const service = new GetProductsService(repository);
        return new GetProductsController(service);
    }

    public async handle(request: Request, response: Response) {
        try {
            const products = await this.getProductsService.execute();
            return response.status(200).json(products);
        } catch (error) {
            return response.status(500).json({ error: "Internal server error", details: error });
        }
    }
}