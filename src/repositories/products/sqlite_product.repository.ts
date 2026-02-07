import { Product } from "../../entities/products.entitiy.js";
import { IProductGateway } from "../../gateways/product.gateway.js";
import { prisma } from "../../utils/prisma/prisma.js";

export class ProductRepository implements IProductGateway {
    public async createProduct(data: Product): Promise<Product> {
        const createProduct = await prisma.product.create({ data: {
            id: data.id,
            name: data.name,
            description: data.description,
            category: data.category,
            quantity: data.quantity,
            price: data.price,
        } });

        return new Product({
            id: createProduct.id,
            name: createProduct.name,
            description: createProduct.description,
            category: createProduct.category,
            quantity: createProduct.quantity,
            price: createProduct.price,
        });
    }

    public async getProducts(): Promise<Product[]> {
        const products = await prisma.product.findMany();
        return products.map(p => new Product({
            id: p.id,
            name: p.name,
            description: p.description,
            category: p.category,
            quantity: p.quantity,
            price: p.price,
        }));
    }

    public async getProductById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({ where: { id } });

        if (!product) return null;

        return new Product({
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            price: product.price,
        });
    }

    public async updateProduct(id: string, data: Product): Promise<void> {
        await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                category: data.category,
                quantity: data.quantity,
                price: data.price,
            }
        });
    }
    
    public async deleteProduct(id: string): Promise<void> {
        await prisma.product.delete({ where: { id } });
    }
}