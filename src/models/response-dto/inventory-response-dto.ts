export class InventoryResponse {
    id: number;
    initialQuantity: number;
    initialPrice: number;
    currentQuantity: number;
    currentPrice: number;
    productId: number;
    productName: string;
    dateCreated: Date;
    dateUpdated: Date;
}