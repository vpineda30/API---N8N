import { SqliteProductRepository } from "../../repositories/products/sqlite-product.repository.js";
import { DeleteProductService } from "../../services/products/delete-product.service.js";

export class DeleteProductController {
    constructor(private readonly deleteProductService: DeleteProductService) { }

    public static builder(): DeleteProductController {
        const repository = new SqliteProductRepository();
        const service = new DeleteProductService(repository);
        return new DeleteProductController(service);
    }

    public async handler(request: any, response: any) {
        try {
            const { id } = request.params;
            const result = await this.deleteProductService.execute({ id });
            response.status(200).json(result);
        } catch (error) {
            return response.status(500).json({ error: "Internal server error", details: error });
        }
    }
}