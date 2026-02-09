import { Request, Response } from "express";
import { SqliteSalesRepository } from "../../repositories/sales/sqlite-sales.repository.js";
import { GetSalesDetailsService } from "../../services/sales/get-sales-details.service.js";

export class GetSaleDetailsController {
    constructor(private readonly getSalesDetailsService: GetSalesDetailsService) {}

    public static builder(): GetSaleDetailsController {
        const repository = new SqliteSalesRepository();
        const service = new GetSalesDetailsService(repository);
        return new GetSaleDetailsController(service);
    }

    public async handler(request: Request, response: Response): Promise<any> {
        try {
            const result = await this.getSalesDetailsService.execute(undefined);
            return response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: "Internal server error", details: error });
        }
    }
}