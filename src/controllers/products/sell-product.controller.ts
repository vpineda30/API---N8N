import { Request, Response } from "express";
import { SqliteProductRepository } from "../../repositories/products/sqlite-product.repository.js";
import { SellProductService } from "../../services/products/sell-product.service.js";

export class SellProductController {
    constructor(private readonly sellProductService: SellProductService) { }

    public static builder(): SellProductController {
        const repository = new SqliteProductRepository();
        const service = new SellProductService(repository);
        return new SellProductController(service);
    }

    public async handler(request: Request<{ id: string }>, response: Response) {
        try {
            const { id } = request.params;
            const { quantity } = request.body;
            const updatedProduct = await this.sellProductService.execute({ productId: id, quantity });
            response.status(200).json(updatedProduct);
        } catch (error) {
            response.status(400).json({ error: "Internal server error", details: error });
            throw error
        }
    }
}