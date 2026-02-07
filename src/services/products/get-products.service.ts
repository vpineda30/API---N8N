import { Product } from "../../entities/products.entitiy.js";
import { IProductGateway } from "../../gateways/product.gateway.js";
import { IServiceDto } from "../../interfaces/dtos/service.dto.js";
import { ProductRepository } from "../../repositories/products/sqlite_product.repository.js";

type getProductsInputDto = void;

type getProductsOutputDto = {
    id: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
}[];

export class GetProductsService implements IServiceDto<getProductsInputDto, getProductsOutputDto> {
    constructor(private readonly productsGateway: IProductGateway) {}

    public async execute(): Promise<getProductsOutputDto> {
        const getProducts = await this.productsGateway.getProducts();
        return this.output(getProducts);
    }

    private output(data: Product[]): getProductsOutputDto {
        return data.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            quantity: p.quantity || 0,
            price: p.price
        }));
    }
}