import { randomUUID } from "node:crypto"

export interface IProductProps {
    id: string
    name: string
    description: string
    category: string
    price: number
    quantity: number
}

export class Product {
    constructor(private readonly props: IProductProps) {}

    public static create(name: string, description: string, category: string, quantity: number, price: number) {
        return new Product({
            id: randomUUID(),
            name,
            description,
            category,
            quantity: 0,
            price,
        });
    }

    public static update(id: string, name: string, description: string, category: string, quantity: number, price: number) {
        return new Product({
            id,
            name,
            description,
            category,
            quantity,
            price,
        })
    }

    public static addQuantity(product: Product, quantity: number) {
        product.props.quantity = (product.props.quantity || 0) + quantity;
    }
    
    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }
    
    public get description() {
        return this.props.description;
    }

    public get category() {
        return this.props.category;
    }

    public get price() {
        return this.props.price;
    }

    public get quantity() {
        return this.props.quantity;
    }
}