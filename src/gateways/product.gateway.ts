import { Product } from "../entities/products.entitiy.js"

export interface IProductGateway {
    createProduct(data: Product): Promise<Product>
    getProducts(): Promise<Product[]>
    getProductById(id: string): Promise<Product | null>
    updateProduct(id: string, data: Product): Promise<void>
    deleteProduct(id: string): Promise<void>
}