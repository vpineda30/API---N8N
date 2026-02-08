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
  price: number;
};

export class UpdateProductService implements IServiceDto<updateProductInputDto, updateProductOutputDto> {
    constructor(private readonly productsGateway: IProductGateway) {}

    public async execute({id, data }: updateProductInputDto) {
        const product = await this.productsGateway.getProductById(id)

        if (!product) {
            throw new Error("Product not found");
        }

        const updatedProduct = Product.create(
            data.name || product.name,
            data.description || product.description,
            data.category || product.category,
            data.price || product.price
        );
        
        await this.productsGateway.updateProduct(id, updatedProduct);
        return this.output(updatedProduct);
    }

    private output(data: Product): updateProductOutputDto {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
        }
    }
}