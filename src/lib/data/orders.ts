// Order Interface sesuai ERD
export interface Order {
  orderId: string; // UUID/BIGINT
  customerId: string; // FK ke users / customer_user_id
  orderedByResellerId?: string; // FK ke users / reseller_user_id, NULLABLE
  orderedByAgentId?: string; // FK ke users / agent_user_id, NULLABLE
  orderedByDistributorId?: string; // FK ke users / distributor_user_id, NULLABLE
  orderDate: string; // TIMESTAMP
  totalAmount: number; // DECIMAL
  shippingAddressJson: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }; // JSONB/TEXT
  shippingMethod: string; // VARCHAR
  shippingCost: number; // DECIMAL
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'; // ENUM
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'; // ENUM
  trackingNumber?: string; // VARCHAR, NULLABLE
  logisticsPartnerId?: string; // FK ke logistics_partners, NULLABLE
  createdAt: string; // TIMESTAMP
  updatedAt: string; // TIMESTAMP
}

// Order Item Interface sesuai ERD
export interface OrderItem {
  orderItemId: string; // UUID/BIGINT
  orderId: string; // FK ke orders
  productId: string; // FK ke products
  quantity: number; // INTEGER
  unitPriceAtOrder: number; // DECIMAL
  subtotal: number; // DECIMAL
  principalId: string; // FK ke principals - denormalized for easy lookup
}

// Payment Transaction Interface sesuai ERD
export interface PaymentTransaction {
  transactionId: string; // UUID/BIGINT
  orderId: string; // FK ke orders
  paymentGatewayRef: string; // VARCHAR
  amount: number; // DECIMAL
  transactionDate: string; // TIMESTAMP
  status: 'success' | 'failed' | 'pending'; // ENUM
  paymentMethod: string; // VARCHAR
}

// Reseller Commission Interface sesuai ERD
export interface ResellerCommission {
  commissionId: string; // UUID/BIGINT
  orderItemId: string; // FK ke order_items
  resellerId: string; // FK ke resellers
  commissionAmount: number; // DECIMAL
  commissionPercentage: number; // DECIMAL
  calculatedAt: string; // TIMESTAMP
  payoutStatus: 'pending' | 'paid'; // ENUM
}

// Agent Referral Fee Interface sesuai ERD
export interface AgentReferralFee {
  referralFeeId: string; // UUID/BIGINT
  resellerCommissionId: string; // FK ke reseller_commissions
  agentId: string; // FK ke agents
  feeAmount: number; // DECIMAL
  feePercentage: number; // DECIMAL
  calculatedAt: string; // TIMESTAMP
  payoutStatus: 'pending' | 'paid'; // ENUM
}

// Payout Interface sesuai ERD
export interface Payout {
  payoutId: string; // UUID/BIGINT
  recipientUserId: string; // FK ke users - could be reseller or agent
  totalAmount: number; // DECIMAL
  payoutDate: string; // TIMESTAMP
  bankAccountInfoJson: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    branchCode?: string;
  }; // JSONB/TEXT - sensitive, should be encrypted
  status: 'processed' | 'failed'; // ENUM
}

// Logistics Partner Interface sesuai ERD
export interface LogisticsPartner {
  partnerId: string; // UUID/BIGINT
  partnerName: string; // VARCHAR
  apiKey: string; // VARCHAR - sensitive, stored securely
  apiSecret: string; // VARCHAR - sensitive, stored securely
  apiBaseUrl: string; // VARCHAR
  isActive: boolean; // BOOLEAN
}

// Shipment Interface sesuai ERD
export interface Shipment {
  shipmentId: string; // UUID/BIGINT
  orderId: string; // FK ke orders, UNIQUE
  trackingNumber: string; // VARCHAR
  logisticsPartnerId: string; // FK ke logistics_partners
  shippingLabelUrl?: string; // VARCHAR, NULLABLE
  actualShipDate?: string; // TIMESTAMP, NULLABLE
  actualDeliveryDate?: string; // TIMESTAMP, NULLABLE
  shipmentStatus: 'created' | 'in_transit' | 'delivered' | 'failed' | 'cancelled'; // ENUM
  lastStatusUpdateAt: string; // TIMESTAMP
}

// Tracking Step Interface
export interface TrackingStep {
  status: string;
  date?: string;
  completed: boolean;
  description?: string;
}

// Sample data dengan struktur baru
export const logisticsPartners: LogisticsPartner[] = [
  {
    partnerId: "logistics-001",
    partnerName: "JNE Express",
    apiKey: "jne_api_key_here",
    apiSecret: "jne_api_secret_here",
    apiBaseUrl: "https://api.jne.co.id",
    isActive: true
  },
  {
    partnerId: "logistics-002",
    partnerName: "SiCepat Express",
    apiKey: "sicepat_api_key_here",
    apiSecret: "sicepat_api_secret_here",
    apiBaseUrl: "https://api.sicepat.com",
    isActive: true
  }
];

// Sample orders dengan struktur baru
export const orders: Order[] = [
  {
    orderId: "order-001",
    customerId: "user-customer-001",
    orderedByResellerId: "user-reseller-001",
    orderDate: "2024-01-15T10:30:00Z",
    totalAmount: 41525000,
    shippingAddressJson: {
      name: "David Customer",
      phone: "+62831234567",
      email: "customer@email.com",
      address: "Bandung Shopping Center",
      city: "Bandung",
      state: "Jawa Barat",
      zipCode: "40111",
      country: "Indonesia"
    },
    shippingMethod: "Standard Delivery",
    shippingCost: 25000,
    orderStatus: "shipped",
    paymentStatus: "paid",
    trackingNumber: "TRK-2024-001",
    logisticsPartnerId: "logistics-001",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-18T09:00:00Z"
  },
  {
    orderId: "order-002",
    customerId: "user-customer-001",
    orderedByResellerId: "user-reseller-001",
    orderDate: "2024-01-20T14:15:00Z",
    totalAmount: 4625000,
    shippingAddressJson: {
      name: "David Customer",
      phone: "+62831234567",
      email: "customer@email.com",
      address: "Bandung Shopping Center",
      city: "Bandung",
      state: "Jawa Barat",
      zipCode: "40111",
      country: "Indonesia"
    },
    shippingMethod: "Express Delivery",
    shippingCost: 25000,
    orderStatus: "processing",
    paymentStatus: "paid",
    trackingNumber: "TRK-2024-002",
    logisticsPartnerId: "logistics-002",
    createdAt: "2024-01-20T14:15:00Z",
    updatedAt: "2024-01-21T10:30:00Z"
  },
  {
    orderId: "order-003",
    customerId: "user-customer-001",
    orderedByResellerId: "user-reseller-001",
    orderDate: "2024-01-05T09:45:00Z",
    totalAmount: 16525000,
    shippingAddressJson: {
      name: "David Customer",
      phone: "+62831234567",
      email: "customer@email.com",
      address: "Bandung Shopping Center",
      city: "Bandung",
      state: "Jawa Barat",
      zipCode: "40111",
      country: "Indonesia"
    },
    shippingMethod: "Standard Delivery",
    shippingCost: 25000,
    orderStatus: "delivered",
    paymentStatus: "paid",
    trackingNumber: "TRK-2024-003",
    logisticsPartnerId: "logistics-001",
    createdAt: "2024-01-05T09:45:00Z",
    updatedAt: "2024-01-10T16:30:00Z"
  },
  {
    orderId: "order-004",
    customerId: "user-customer-001",
    orderedByResellerId: "user-reseller-001",
    orderDate: "2024-01-22T16:20:00Z",
    totalAmount: 25525000,
    shippingAddressJson: {
      name: "David Customer",
      phone: "+62831234567",
      email: "customer@email.com",
      address: "Bandung Shopping Center",
      city: "Bandung",
      state: "Jawa Barat",
      zipCode: "40111",
      country: "Indonesia"
    },
    shippingMethod: "Standard Delivery",
    shippingCost: 25000,
    orderStatus: "pending",
    paymentStatus: "pending",
    trackingNumber: "TRK-2024-004",
    logisticsPartnerId: "logistics-001",
    createdAt: "2024-01-22T16:20:00Z",
    updatedAt: "2024-01-22T16:20:00Z"
  }
];

// Sample order items
export const orderItems: OrderItem[] = [
  {
    orderItemId: "item-001",
    orderId: "order-001",
    productId: "prod-001",
    quantity: 2,
    unitPriceAtOrder: 16500000,
    subtotal: 33000000,
    principalId: "principal-001"
  },
  {
    orderItemId: "item-002",
    orderId: "order-001",
    productId: "prod-002",
    quantity: 1,
    unitPriceAtOrder: 8500000,
    subtotal: 8500000,
    principalId: "principal-001"
  },
  {
    orderItemId: "item-003",
    orderId: "order-002",
    productId: "prod-003",
    quantity: 5,
    unitPriceAtOrder: 400000,
    subtotal: 2000000,
    principalId: "principal-001"
  },
  {
    orderItemId: "item-004",
    orderId: "order-002",
    productId: "prod-004",
    quantity: 1,
    unitPriceAtOrder: 2600000,
    subtotal: 2600000,
    principalId: "principal-001"
  },
  {
    orderItemId: "item-005",
    orderId: "order-003",
    productId: "prod-001",
    quantity: 1,
    unitPriceAtOrder: 16500000,
    subtotal: 16500000,
    principalId: "principal-001"
  },
  {
    orderItemId: "item-006",
    orderId: "order-004",
    productId: "prod-002",
    quantity: 3,
    unitPriceAtOrder: 8500000,
    subtotal: 25500000,
    principalId: "principal-001"
  }
];

// Sample payment transactions
export const paymentTransactions: PaymentTransaction[] = [
  {
    transactionId: "txn-001",
    orderId: "order-001",
    paymentGatewayRef: "PAY-2024-001",
    amount: 41525000,
    transactionDate: "2024-01-15T11:00:00Z",
    status: "success",
    paymentMethod: "Transfer Bank"
  },
  {
    transactionId: "txn-002",
    orderId: "order-002",
    paymentGatewayRef: "PAY-2024-002",
    amount: 4625000,
    transactionDate: "2024-01-20T15:00:00Z",
    status: "success",
    paymentMethod: "Kartu Kredit"
  },
  {
    transactionId: "txn-003",
    orderId: "order-003",
    paymentGatewayRef: "PAY-2024-003",
    amount: 16525000,
    transactionDate: "2024-01-05T10:15:00Z",
    status: "success",
    paymentMethod: "Dompet Digital"
  }
];

// Sample shipments
export const shipments: Shipment[] = [
  {
    shipmentId: "shipment-001",
    orderId: "order-001",
    trackingNumber: "TRK-2024-001",
    logisticsPartnerId: "logistics-001",
    shippingLabelUrl: "https://shipping-label.com/TRK-2024-001.pdf",
    actualShipDate: "2024-01-18T09:00:00Z",
    shipmentStatus: "in_transit",
    lastStatusUpdateAt: "2024-01-19T08:00:00Z"
  },
  {
    shipmentId: "shipment-002",
    orderId: "order-002",
    trackingNumber: "TRK-2024-002",
    logisticsPartnerId: "logistics-002",
    shipmentStatus: "created",
    lastStatusUpdateAt: "2024-01-21T10:30:00Z"
  },
  {
    shipmentId: "shipment-003",
    orderId: "order-003",
    trackingNumber: "TRK-2024-003",
    logisticsPartnerId: "logistics-001",
    shippingLabelUrl: "https://shipping-label.com/TRK-2024-003.pdf",
    actualShipDate: "2024-01-08T14:00:00Z",
    actualDeliveryDate: "2024-01-10T16:30:00Z",
    shipmentStatus: "delivered",
    lastStatusUpdateAt: "2024-01-10T16:30:00Z"
  },
  {
    shipmentId: "shipment-004",
    orderId: "order-004",
    trackingNumber: "TRK-2024-004",
    logisticsPartnerId: "logistics-001",
    shipmentStatus: "created",
    lastStatusUpdateAt: "2024-01-22T16:20:00Z"
  }
];

// Helper functions
export const getOrderById = (orderId: string) => {
  return orders.find(order => order.orderId === orderId);
};

export const getOrdersByCustomer = (customerId: string) => {
  return orders.filter(order => order.customerId === customerId);
};

export const getOrdersByReseller = (resellerId: string) => {
  return orders.filter(order => order.orderedByResellerId === resellerId);
};

export const getOrderItemsByOrderId = (orderId: string) => {
  return orderItems.filter(item => item.orderId === orderId);
};

export const getPaymentTransactionByOrderId = (orderId: string) => {
  return paymentTransactions.find(txn => txn.orderId === orderId);
};

export const getShipmentByOrderId = (orderId: string) => {
  return shipments.find(shipment => shipment.orderId === orderId);
};

export const getLogisticsPartnerById = (partnerId: string) => {
  return logisticsPartners.find(partner => partner.partnerId === partnerId);
};

// Legacy functions untuk kompatibilitas
export const resellerOrders = orders.filter(order => order.orderedByResellerId);

export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-orange-100 text-orange-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'returned':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getOrderStatusColorDark = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-900/20 text-yellow-300';
    case 'confirmed':
      return 'bg-blue-900/20 text-blue-300';
    case 'processing':
      return 'bg-orange-900/20 text-orange-300';
    case 'shipped':
      return 'bg-purple-900/20 text-purple-300';
    case 'delivered':
      return 'bg-green-900/20 text-green-300';
    case 'cancelled':
      return 'bg-red-900/20 text-red-300';
    case 'returned':
      return 'bg-red-900/20 text-red-300';
    default:
      return 'bg-gray-900/20 text-gray-300';
  }
};

export const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'refunded':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPaymentStatusColorDark = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-900/20 text-yellow-300';
    case 'paid':
      return 'bg-green-900/20 text-green-300';
    case 'failed':
      return 'bg-red-900/20 text-red-300';
    case 'refunded':
      return 'bg-blue-900/20 text-blue-300';
    default:
      return 'bg-gray-900/20 text-gray-300';
  }
}; 