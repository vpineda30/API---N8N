import axios from "axios";
import { IProductGateway } from "../../../gateways/product.gateway.js";
import { IN8NGateway } from "../gateways/n8n.gateway.js";

export class N8NService implements IN8NGateway {
    constructor(private readonly productsGateway: IProductGateway) {}

    public async sendProductsForN8N(): Promise<any> {
        const products = await this.productsGateway.getProducts();
        const response = await axios.post("http://localhost:5678/webhook-test/9313b805-ad11-4a48-8421-e11e8c7bae3e", products);   
        return response.data;
    }
}