import { Sale } from "../entities/sale.entity.js"

export interface ISalesGateway {
    getSalesDetails(): Promise<Sale[]>
    getTotalOfSales(): Promise<number>
    addSale(productId: string, productValue: number, quantity: number): Promise<void> 
}