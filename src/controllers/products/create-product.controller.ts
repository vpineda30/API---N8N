import { Request, Response } from "express";
import { SqliteProductRepository } from "../../repositories/products/sqlite-product.repository.js";
import { CreateProductService } from "../../services/products/create-product.service.js";

export class CreateProductController {
    constructor(private readonly createProductService: CreateProductService) { }

    public static builder(): CreateProductController {
        const repository = new SqliteProductRepository();
        const service = new CreateProductService(repository);
        return new CreateProductController(service);
    }

    public async handler(request: Request, response: Response) {
        try {
            const product = await this.createProductService.execute(request.body);
            response.status(201).json(product);
        } catch (error) {
            response.status(400).json({ error: "Internal server error", details: error });
        }
    }
}