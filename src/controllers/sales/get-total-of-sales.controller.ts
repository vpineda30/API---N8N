import { Request, Response } from "express";
import { SqliteSalesRepository } from "../../repositories/sales/sqlite-sales.repository.js";
import { GetTotalOfSalesService } from "../../services/sales/get-total-of-sales.service.js";

export class GetTotalOfSalesController {
    constructor(private readonly getTotalOfSalesService: GetTotalOfSalesService) { }

    public static builder(): GetTotalOfSalesController {
        const repository = new SqliteSalesRepository()
        const getTotalOfSalesService = new GetTotalOfSalesService(repository);
        return new GetTotalOfSalesController(getTotalOfSalesService);
    }

    public async handler(request: Request, response: Response) {
        try {
            const total = await this.getTotalOfSalesService.execute();
            response.status(200).json({ total });
        } catch (error) {
            response.status(400).json({ error: "Internal server error", details: error });
        }
    }
}