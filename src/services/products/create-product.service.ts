import { Product } from "../../entities/products.entitiy.js";
import { IProductGateway } from "../../gateways/product.gateway.js";
import { IServiceDto } from "../../interfaces/dtos/service.dto.js";

type createProductInputDto = {
    name: string
    description: string;
    category: string;
    quantity: number;
    price: number;
}

type createProductOutputDto = {
    id: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
}

export class CreateProductService implements IServiceDto<createProductInputDto, createProductOutputDto> {
    constructor(private readonly productsGateway: IProductGateway) {}

    public async execute(data: createProductInputDto): Promise<createProductOutputDto> {
        const product = Product.create(data.name, data.description, data.category, data.price); 
        Product.addQuantity(product, data.quantity);
        const createProduct = await this.productsGateway.createProduct(product);
        return this.output(createProduct)
    }

    private output(data: createProductOutputDto): createProductOutputDto {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            category: data.category,
            quantity: data.quantity,
            price: data.price
        };
    }
}