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

    public static create(name: string, description: string, category: string, price: number) {
        return new Product({
            id: randomUUID(),
            name,
            description,
            category,
            price,
            quantity: 0,
        });
    }

    public static addQuantity(product: Product, quantity: number) {
        product.props.quantity = (product.props.quantity || 0) + quantity;
    }

    public static decreaseQuantity(product: Product, quantity: number) {
        if ((product.props.quantity || 0) < quantity) {
            throw new Error("Not enough quantity in stock");
        }
        product.props.quantity = (product.props.quantity || 0) - quantity;
    }

    public static sellProduct(product: Product, quantity: number) {
        this.decreaseQuantity(product, quantity);
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