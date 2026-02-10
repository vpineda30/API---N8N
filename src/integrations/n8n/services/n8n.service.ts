import axios from "axios";
import { IN8NGateway } from "../gateways/n8n.gateway.js";
import { ISalesGateway } from "../../../gateways/sales.gateway.js";

export class N8NService implements IN8NGateway {
    constructor(private readonly saleGateway: ISalesGateway) {}

    public async sendProductsForN8N(): Promise<any> {
        const products = await this.saleGateway.getSalesDetails()
        const response = await axios.post("https://vopineda.app.n8n.cloud/webhook-test/2ee3b8d9-5ff3-4486-aa65-47035dd10cab", products);   
        return response.data;
    }
}