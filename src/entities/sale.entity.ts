interface ISaleProps {
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
    }[]
}

export class Sale {
    constructor(private readonly props: ISaleProps) {}

    public get id() {
        return this.props.id;
    }

    public get total() {
        return this.props.total;
    }

    public get date() {
        return this.props.date;
    }

    public get items() {
        return this.props.items;
    }
}