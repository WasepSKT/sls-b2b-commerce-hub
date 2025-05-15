export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  customerId: string;
  items: CartItem[];
  updatedAt: string;
}

export const carts: Cart[] = [
  {
    customerId: "customer-1",
    items: [
      {
        productId: "prod-1",
        quantity: 1
      },
      {
        productId: "prod-3",
        quantity: 2
      }
    ],
    updatedAt: "2024-02-21T08:30:00Z"
  }
]; 