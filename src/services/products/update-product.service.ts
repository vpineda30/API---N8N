import { Product } from "../../entities/products.entitiy.js";
import { IProductGateway } from "../../gateways/product.gateway.js";
import { IServiceDto } from "../../interfaces/dtos/service.dto.js";

type updateProductInputDto = {
  id: string;
  data: {
      name?: string;
      description?: string;
      category?: string;
      quantity?: number;
      price?: number;
  }
};

type updateProductOutputDto = {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  price: number;
};

export class UpdateProductService implements IServiceDto<updateProductInputDto, updateProductOutputDto> {
    constructor(private readonly productsGateway: IProductGateway) {}

    public async execute({ id, data }: updateProductInputDto): Promise<updateProductOutputDto> {
        const product = await this.productsGateway.getProductById(id)

        if (!product) {
            throw new Error("Product not found");
        }

        const buildProduct = Product.update(
            product.id,
            data.name ?? product.name,
            data.description ?? product.description,
            data.category ?? product.category,
            data.quantity ?? product.quantity,
            data.price ?? product.price
        );
        
        await this.productsGateway.updateProduct(id, buildProduct);
        return this.output(buildProduct);
    }

    private output(data: Product): updateProductOutputDto {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            category: data.category,
            quantity: data.quantity,
            price: data.price,
        }
    }
}