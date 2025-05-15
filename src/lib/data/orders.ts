export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  discountAtPurchase: number;
}

export interface Order {
  id: string;
  customerId: string;
  agentId?: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export const orders: Order[] = [
  {
    id: "ord-1",
    customerId: "customer-1",
    agentId: "agent-1",
    items: [
      {
        productId: "prod-1",
        quantity: 2,
        priceAtPurchase: 15000000,
        discountAtPurchase: 10
      },
      {
        productId: "prod-3",
        quantity: 5,
        priceAtPurchase: 3500000,
        discountAtPurchase: 15
      }
    ],
    status: "delivered",
    totalAmount: 47250000, // (15000000 * 0.9 * 2) + (3500000 * 0.85 * 5)
    shippingAddress: "Bandung Shopping Center",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    createdAt: "2024-01-25T14:30:00Z",
    updatedAt: "2024-01-28T10:00:00Z"
  },
  {
    id: "ord-2",
    customerId: "customer-1",
    agentId: "agent-1",
    items: [
      {
        productId: "prod-2",
        quantity: 3,
        priceAtPurchase: 2500000,
        discountAtPurchase: 0
      }
    ],
    status: "processing",
    totalAmount: 7500000,
    shippingAddress: "Bandung Shopping Center",
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    createdAt: "2024-02-15T09:15:00Z",
    updatedAt: "2024-02-15T09:15:00Z"
  },
  {
    id: "ord-3",
    customerId: "customer-1",
    items: [
      {
        productId: "prod-4",
        quantity: 1,
        priceAtPurchase: 25000000,
        discountAtPurchase: 5
      }
    ],
    status: "pending",
    totalAmount: 23750000,
    shippingAddress: "Bandung Shopping Center",
    paymentMethod: "bank_transfer",
    paymentStatus: "pending",
    createdAt: "2024-02-20T16:45:00Z",
    updatedAt: "2024-02-20T16:45:00Z"
  }
]; 