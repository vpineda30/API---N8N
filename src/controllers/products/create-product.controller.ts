import { Request, Response } from "express";
import { ProductRepository } from "../../repositories/products/sqlite_product.repository.js";
import { CreateProductService } from "../../services/products/create-product.service.js";

export class CreateProductController {
    constructor(private readonly createProductService: CreateProductService) {}

    public static builder(): CreateProductController {
        const repository = new ProductRepository();
        const service = new CreateProductService(repository);
        return new CreateProductController(service);
    }

    public async handle(request: Request, response: Response) {
        try {
            const product = await this.createProductService.execute(request.body);
            response.status(201).json(product);
        } catch (error) {
            response.status(400).json({ error: "Internal server error", details: error });
        }
    }
}