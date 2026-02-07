import { Request, Response } from "express";
import { N8NService } from "../services/n8n.service.js";
import { ProductRepository } from "../../../repositories/products/sqlite_product.repository.js";

export class N8NController {
    constructor(private readonly n8nService: N8NService) {}

    public static builder(): N8NController {
        const repository = new ProductRepository()
        const service = new N8NService(repository);
        return new N8NController(service);
    }

    public async handler(request: Request, response: Response) {
        const products = await this.n8nService.sendProductsForN8N();
        return response.status(201).json(products);
    }
}