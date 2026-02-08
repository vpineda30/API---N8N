import { Request, Response } from "express";
import { UpdateProductService } from "../../services/products/update-product.service.js";
import { ProductRepository } from "../../repositories/products/sqlite_product.repository.js";

export class UpdateProductController {
    constructor(private readonly updateProductService: UpdateProductService) {}

    public static builder(): UpdateProductController {
        const repository = new ProductRepository();
        const service = new UpdateProductService(repository);
        return new UpdateProductController(service);
    }

    public async handler(request: Request<{ id: string }>, response: Response) {
        try {
            const { id } = request.params;
            const data = request.body;
            const updatedProduct = await this.updateProductService.execute({ id, data });
            response.status(200).json(updatedProduct);
        } catch (error) {
            response.status(400).json({ error: "Internal server error", details: error });
        }
    }
}