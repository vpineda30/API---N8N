import { Sale } from "../../entities/sale.entity.js";
import { ISalesGateway } from "../../gateways/sales.gateway.js";
import { IServiceDto } from "../../interfaces/dtos/service.dto.js";

type GetSalesDetailsServiceInputDto = void

type GetSalesDetailsServiceOutputDto = {
    id: string;
    total: number;
    date: Date;
    items: {
        productId: string;
        name: string;
        description: string;
        category: string;
        quantity: number;
        price: number;
    }[];
}[];

export class GetSalesDetailsService implements IServiceDto<GetSalesDetailsServiceInputDto, GetSalesDetailsServiceOutputDto> {
    constructor(private readonly salesGateway: ISalesGateway) {}

    public async execute(input: void): Promise<GetSalesDetailsServiceOutputDto> {
        const salesDetails = await this.salesGateway.getSalesDetails();
        return this.output(salesDetails);
    }

    private output(salesDetails: Sale[]): GetSalesDetailsServiceOutputDto {
        return salesDetails.map((s) => {
            return new Sale({
                id: s.id,
                total: s.total,
                date: s.date,
                items: s.items.map((item) => ({
                    productId: item.productId,
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    quantity: item.quantity,
                    price: item.price
                }))
            })
        })
    }
}