import { ISalesGateway } from "../../gateways/sales.gateway.js";
import { IServiceDto } from "../../interfaces/dtos/service.dto.js";

type getTotalOfSalesServiceInputDto = void
type getTotalOfSalesServiceOutputDto = number;

export class GetTotalOfSalesService implements IServiceDto<void, number> {
    constructor(private readonly salesGateway: ISalesGateway) {}

    public async execute(): Promise<getTotalOfSalesServiceOutputDto> {
        const totalOfSales = await this.salesGateway.getTotalOfSales();
        return this.output(totalOfSales);
    }

    private output(total: number): getTotalOfSalesServiceOutputDto {
        return total;
    }
}