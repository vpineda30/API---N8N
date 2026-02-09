import { Sale } from "../../entities/sale.entity.js";
import { ISalesGateway } from "../../gateways/sales.gateway.js";
import { prisma } from "../../utils/prisma/prisma.js";

export class SqliteSalesRepository implements ISalesGateway {
    public async getSalesDetails(): Promise<Sale[]> {
        const sales = await prisma.sale.findMany({ include: { items: true } });

        return sales.map((s) => {
            return new Sale({
                id: s.id,
                total: s.total.toNumber(),
                date: s.createdAt,
                items: s.items.map((i) => {
                    return { 
                        productId: i.productId,
                        name: i.name,
                        description: i.description,
                        category: i.category,
                        quantity: i.quantity,
                        price: i.priceAtSale.toNumber()
                    }
                }) 
            })
        })
    }

    public async getTotalOfSales(): Promise<number> {
        const totalSales = await prisma.sale.aggregate({ _sum: { total: true } });
        return totalSales._sum.total?.toNumber() || 0;
    }

    public async addSale(productId: string, productValue: number, quantity: number): Promise<void> {
        await prisma.sale.create({
            data: {
                productId,
                total: productValue * quantity,
            }
        });
    }
}