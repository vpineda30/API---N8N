import { IProductGateway } from "../../gateways/product.gateway.js";
import { IServiceDto } from "../../interfaces/dtos/service.dto.js";

type deleteProductInputDto = {
    id: string
}

type deleteProductOutputDto = any

export class DeleteProductService implements IServiceDto<deleteProductInputDto, deleteProductOutputDto> {
    constructor(private readonly productGateway: IProductGateway) {}

    public async execute({ id }: deleteProductInputDto): Promise<deleteProductOutputDto> {
        const product = await this.productGateway.getProductById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        await this.productGateway.deleteProduct(id);
        return this.output(product);
    }

    private output(data: deleteProductOutputDto): deleteProductOutputDto {
        return {
            message: "Product deleted successfully",
            product: data
        }
    }
}
