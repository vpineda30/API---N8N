import { IProductGateway } from "../../gateways/product.gateway.js";
import { IServiceDto } from "../../interfaces/dtos/service.dto.js";

type SellProductInputDto = {
    productId: string;
    quantity: number;
}

type SellProductOutputDto = any

export class SellProductService implements IServiceDto<SellProductInputDto, SellProductOutputDto> {
    constructor(private readonly productGateway: IProductGateway) {}

    public async execute({ productId, quantity } : SellProductInputDto): Promise<SellProductOutputDto> {
        await this.productGateway.sellProduct(productId, quantity);
        return this.output();
    }

    private output(): SellProductOutputDto {
        return {
            message: "Sale completed successfully"
        }
    }
}