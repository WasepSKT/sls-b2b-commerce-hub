// Product Interface sesuai ERD
export interface Product {
  productId: string; // UUID/BIGINT
  principalId: string; // FK ke principals
  productName: string; // VARCHAR
  description: string; // TEXT
  sku: string; // VARCHAR, UNIQUE
  basePrice: number; // DECIMAL
  imageUrls: string[]; // JSONB/TEXT
  category: string; // VARCHAR
  weightGrams: number; // DECIMAL
  dimensionsCm: {
    length: number;
    width: number;
    height: number;
  }; // JSONB/TEXT
  specifications?: Array<{
    label: string;
    value: string;
  }>; // JSONB/TEXT
  features?: string[]; // JSONB/TEXT
  isActive: boolean; // BOOLEAN, default: true
  createdAt: string; // TIMESTAMP
  updatedAt: string; // TIMESTAMP
}

// Review Interface
export interface Review {
  reviewId: string;
  productId: string; // FK ke products
  userId: string; // FK ke users
  userName: string;
  userAvatar?: string;
  userVerified: boolean;
  rating: number; // 1-5
  title: string;
  comment: string;
  reviewImages?: string[];
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

// Product Recommendation Interface
export interface ProductRecommendation {
  recommendationId: string;
  productId: string; // FK ke products
  recommendationType: 'featured' | 'trending' | 'similar' | 'admin_pick' | 'best_seller';
  priority: number; // 1-10, higher = more priority
  algorithm: string; // Algorithm used for recommendation
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Factory Interface sesuai ERD
export interface Factory {
  factoryId: string; // UUID/BIGINT
  principalId: string; // FK ke principals
  factoryName: string; // VARCHAR
  address: string; // TEXT
}

// Inventory Interface sesuai ERD
export interface Inventory {
  inventoryId: string; // UUID/BIGINT
  productId: string; // FK ke products, UNIQUE
  factoryId: string; // FK ke factories
  quantityOnHand: number; // INTEGER
  lastUpdatedBy: string; // FK ke users / Admin userId
  lastUpdatedAt: string; // TIMESTAMP
}

// Product Category Interface
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  parentId?: string;
}

// Categories
export const categories: ProductCategory[] = [
  { id: "cat-1", name: "Elektronik", description: "Produk elektronik dan gadget" },
  { id: "cat-2", name: "Fashion", description: "Pakaian dan aksesoris" },
  { id: "cat-3", name: "Home & Living", description: "Perlengkapan rumah tangga" },
  { id: "cat-4", name: "Sports", description: "Perlengkapan olahraga" },
  { id: "cat-5", name: "Books", description: "Buku dan literatur" },
];

// Mock Reviews Data
export const mockReviews: Review[] = [
  {
    reviewId: "rev-001",
    productId: "prod-001",
    userId: "user-001",
    userName: "Ahmad Sulaiman",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    userVerified: true,
    rating: 5,
    title: "Laptop Gaming yang Sangat Bagus!",
    comment: "Kualitas laptop gaming ini sangat memuaskan. Performa untuk gaming dan kerja sangat smooth. GPU RTX 4070 benar-benar powerful untuk game AAA. Keyboard RGB juga keren dan responsive. Sangat direkomendasikan untuk gamer dan content creator!",
    reviewImages: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    helpfulCount: 12,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    reviewId: "rev-002",
    productId: "prod-001",
    userId: "user-002",
    userName: "Siti Nurhaliza",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b6b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    userVerified: true,
    rating: 4,
    title: "Kualitas Bagus, Harga Worth It",
    comment: "Laptop ini sangat cocok untuk editing video dan rendering 3D. RAM 32GB DDR5 sangat membantu untuk multitasking. Hanya sedikit panas saat gaming berat, tapi masih dalam batas normal. Overall puas dengan pembelian ini.",
    reviewImages: [],
    helpfulCount: 8,
    createdAt: "2024-01-12T14:20:00Z",
    updatedAt: "2024-01-12T14:20:00Z"
  },
  {
    reviewId: "rev-003",
    productId: "prod-002",
    userId: "user-003",
    userName: "Budi Santoso",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    userVerified: false,
    rating: 5,
    title: "Smartphone Premium yang Excellent!",
    comment: "Kamera 108MP benar-benar menghasilkan foto yang menakjubkan. Baterai 5000mAh tahan lama untuk penggunaan sehari-hari. Layar AMOLED 120Hz sangat smooth. Prosesor Snapdragon 8 Gen 2 sangat powerful. Worth every penny!",
    reviewImages: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    helpfulCount: 15,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z"
  },
  {
    reviewId: "rev-004",
    productId: "prod-002",
    userId: "user-004",
    userName: "Dewi Sartika",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    userVerified: true,
    rating: 4,
    title: "Smartphone yang Bagus untuk Fotografi",
    comment: "Kamera utama 108MP menghasilkan foto yang detail dan tajam. Mode portrait sangat bagus untuk foto manusia. Baterai tahan lama untuk penggunaan sehari-hari. Hanya sedikit mahal tapi kualitas sesuai harga.",
    reviewImages: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    helpfulCount: 6,
    createdAt: "2024-01-08T16:45:00Z",
    updatedAt: "2024-01-08T16:45:00Z"
  },
  {
    reviewId: "rev-005",
    productId: "prod-006",
    userId: "user-005",
    userName: "Rudi Hartono",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    userVerified: true,
    rating: 5,
    title: "Kamera DSLR Professional yang Luar Biasa!",
    comment: "Sensor full-frame 24.1MP menghasilkan foto berkualitas tinggi. Autofocus 45-point sangat cepat dan akurat. ISO range 100-51200 memungkinkan fotografi dalam kondisi cahaya rendah. Video 4K 30fps juga sangat bagus. Perfect untuk fotografer profesional!",
    reviewImages: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1510127034890-ba275aee457a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    helpfulCount: 23,
    createdAt: "2024-01-05T11:30:00Z",
    updatedAt: "2024-01-05T11:30:00Z"
  },
  {
    reviewId: "rev-006",
    productId: "prod-006",
    userId: "user-006",
    userName: "Maya Indah",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    userVerified: false,
    rating: 4,
    title: "Kamera DSLR yang Bagus untuk Pemula",
    comment: "Meskipun ini kamera profesional, cukup user-friendly untuk pemula. LCD touchscreen 3.2 inch memudahkan pengaturan. WiFi dan Bluetooth built-in memudahkan transfer foto. Hanya perlu waktu untuk belajar semua fiturnya.",
    reviewImages: [],
    helpfulCount: 4,
    createdAt: "2024-01-03T13:20:00Z",
    updatedAt: "2024-01-03T13:20:00Z"
  }
];

// Mock Product Recommendations Data
export const mockProductRecommendations: ProductRecommendation[] = [
  // Featured Products (Admin picks)
  {
    recommendationId: "rec-001",
    productId: "prod-001",
    recommendationType: "featured",
    priority: 10,
    algorithm: "admin_selection",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    recommendationId: "rec-002",
    productId: "prod-006",
    recommendationType: "featured",
    priority: 9,
    algorithm: "admin_selection",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    recommendationId: "rec-003",
    productId: "prod-002",
    recommendationType: "featured",
    priority: 8,
    algorithm: "admin_selection",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },

  // Trending Products (Based on views/sales)
  {
    recommendationId: "rec-004",
    productId: "prod-003",
    recommendationType: "trending",
    priority: 7,
    algorithm: "view_count_algorithm",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    recommendationId: "rec-005",
    productId: "prod-004",
    recommendationType: "trending",
    priority: 6,
    algorithm: "view_count_algorithm",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },

  // Similar Products (Based on category/features)
  {
    recommendationId: "rec-006",
    productId: "prod-005",
    recommendationType: "similar",
    priority: 5,
    algorithm: "category_similarity",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    recommendationId: "rec-007",
    productId: "prod-007",
    recommendationType: "similar",
    priority: 4,
    algorithm: "category_similarity",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },

  // Best Sellers (Based on sales volume)
  {
    recommendationId: "rec-008",
    productId: "prod-008",
    recommendationType: "best_seller",
    priority: 7,
    algorithm: "sales_volume_algorithm",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    recommendationId: "rec-009",
    productId: "prod-009",
    recommendationType: "best_seller",
    priority: 6,
    algorithm: "sales_volume_algorithm",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    recommendationId: "rec-010",
    productId: "prod-010",
    recommendationType: "best_seller",
    priority: 5,
    algorithm: "sales_volume_algorithm",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  }
];

// Factories
export const factories: Factory[] = [
  {
    factoryId: "factory-001",
    principalId: "principal-001",
    factoryName: "Tech Solutions Factory",
    address: "Jl. Industri No. 123, Jakarta"
  }
];

// Inventory
export const inventory: Inventory[] = [
  {
    inventoryId: "inventory-001",
    productId: "prod-001",
    factoryId: "factory-001",
    quantityOnHand: 50,
    lastUpdatedBy: "user-admin-001",
    lastUpdatedAt: "2024-01-15T10:30:00Z"
  },
  {
    inventoryId: "inventory-002",
    productId: "prod-002",
    factoryId: "factory-001",
    quantityOnHand: 100,
    lastUpdatedBy: "user-admin-001",
    lastUpdatedAt: "2024-01-15T10:30:00Z"
  },
  {
    inventoryId: "inventory-003",
    productId: "prod-003",
    factoryId: "factory-001",
    quantityOnHand: 200,
    lastUpdatedBy: "user-admin-001",
    lastUpdatedAt: "2024-01-15T10:30:00Z"
  },
  {
    inventoryId: "inventory-004",
    productId: "prod-004",
    factoryId: "factory-001",
    quantityOnHand: 25,
    lastUpdatedBy: "user-admin-001",
    lastUpdatedAt: "2024-01-15T10:30:00Z"
  },
  {
    inventoryId: "inventory-005",
    productId: "prod-005",
    factoryId: "factory-001",
    quantityOnHand: 75,
    lastUpdatedBy: "user-admin-001",
    lastUpdatedAt: "2024-01-15T10:30:00Z"
  },
  {
    inventoryId: "inventory-006",
    productId: "prod-006",
    factoryId: "factory-001",
    quantityOnHand: 150,
    lastUpdatedBy: "user-admin-001",
    lastUpdatedAt: "2024-01-15T10:30:00Z"
  }
];

// Principal Products (Original Products) sesuai ERD
export const principalProducts: Product[] = [
  {
    productId: "prod-001",
    principalId: "principal-001",
    productName: "Laptop Gaming Pro",
    description: "Laptop gaming dengan performa tinggi untuk gaming dan kerja",
    sku: "LAPTOP-GAMING-001",
    basePrice: 15000000,
    imageUrls: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Elektronik",
    weightGrams: 2500,
    dimensionsCm: {
      length: 35.5,
      width: 24.5,
      height: 2.2
    },
    specifications: [
      { label: "Prosesor", value: "Intel Core i7-13700H" },
      { label: "GPU", value: "NVIDIA RTX 4070 8GB" },
      { label: "RAM", value: "32GB DDR5 5600MHz" },
      { label: "Storage", value: "1TB NVMe SSD" },
      { label: "Layar", value: "15.6 inch QHD 165Hz" },
      { label: "OS", value: "Windows 11 Pro" },
      { label: "Baterai", value: "86Wh" },
      { label: "Berat", value: "2.5kg" }
    ],
    features: [
      "GPU NVIDIA RTX 4070 8GB GDDR6",
      "Prosesor Intel Core i7-13700H",
      "RAM 32GB DDR5 5600MHz",
      "Storage 1TB NVMe SSD",
      "Layar 15.6 inch QHD 165Hz",
      "RGB Keyboard dengan per-key lighting",
      "WiFi 6E + Bluetooth 5.2",
      "Port USB-C Thunderbolt 4"
    ],
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    productId: "prod-002",
    principalId: "principal-001",
    productName: "Smartphone Premium",
    description: "Smartphone dengan kamera terbaik dan performa maksimal",
    sku: "SMARTPHONE-PREMIUM-001",
    basePrice: 8000000,
    imageUrls: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Elektronik",
    weightGrams: 180,
    dimensionsCm: {
      length: 15.5,
      width: 7.2,
      height: 0.8
    },
    specifications: [
      { label: "Layar", value: "6.7 inch AMOLED" },
      { label: "Prosesor", value: "Snapdragon 8 Gen 2" },
      { label: "RAM", value: "12GB LPDDR5" },
      { label: "Storage", value: "256GB UFS 4.0" },
      { label: "Kamera Utama", value: "108MP + 12MP + 10MP" },
      { label: "Kamera Depan", value: "32MP" },
      { label: "Baterai", value: "5000mAh" },
      { label: "OS", value: "Android 14" }
    ],
    features: [
      "Kamera 108MP dengan OIS",
      "Baterai 5000mAh dengan fast charging 45W",
      "Layar AMOLED 120Hz",
      "Prosesor Snapdragon 8 Gen 2",
      "RAM 12GB + Storage 256GB",
      "Android 14 dengan One UI 6.0",
      "Wireless charging",
      "IP68 water resistant"
    ],
    isActive: true,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z"
  },
  {
    productId: "prod-003",
    principalId: "principal-001",
    productName: "Kemeja Formal Premium",
    description: "Kemeja formal berkualitas tinggi untuk acara resmi",
    sku: "KEMEJA-FORMAL-001",
    basePrice: 350000,
    imageUrls: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Fashion",
    weightGrams: 200,
    dimensionsCm: {
      length: 30,
      width: 20,
      height: 2
    },
    isActive: true,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z"
  },
  {
    productId: "prod-004",
    principalId: "principal-001",
    productName: "Set Sofa Minimalis",
    description: "Sofa minimalis dengan desain modern dan nyaman",
    sku: "SOFA-MINIMALIS-001",
    basePrice: 2500000,
    imageUrls: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Home & Living",
    weightGrams: 45000,
    dimensionsCm: {
      length: 200,
      width: 80,
      height: 85
    },
    isActive: true,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z"
  },
  {
    productId: "prod-005",
    principalId: "principal-001",
    productName: "Sepatu Running Pro",
    description: "Sepatu running dengan teknologi terbaru untuk performa maksimal",
    sku: "SEPATU-RUNNING-001",
    basePrice: 1200000,
    imageUrls: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Sports",
    weightGrams: 300,
    dimensionsCm: {
      length: 28,
      width: 10,
      height: 12
    },
    isActive: true,
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z"
  },
  {
    productId: "prod-006",
    principalId: "principal-001",
    productName: "Kamera DSLR Professional",
    description: "Kamera DSLR dengan sensor full-frame untuk fotografi profesional",
    sku: "KAMERA-DSLR-001",
    basePrice: 8500000,
    imageUrls: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510127034890-ba275aee457a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Elektronik",
    weightGrams: 800,
    dimensionsCm: {
      length: 15,
      width: 12,
      height: 8
    },
    specifications: [
      { label: "Sensor", value: "Full-Frame CMOS" },
      { label: "Resolusi", value: "24.1 Megapixel" },
      { label: "ISO", value: "100-51200" },
      { label: "Autofocus", value: "45-point AF" },
      { label: "Video", value: "4K 30fps" },
      { label: "LCD", value: "3.2 inch Touchscreen" }
    ],
    features: [
      "Sensor full-frame 24.1MP",
      "ISO range 100-51200",
      "Autofocus 45-point",
      "Video 4K 30fps",
      "LCD touchscreen 3.2 inch",
      "WiFi dan Bluetooth built-in"
    ],
    isActive: true,
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z"
  },
  {
    productId: "prod-007",
    principalId: "principal-001",
    productName: "Blender Premium",
    description: "Blender dengan motor kuat untuk hasil yang halus dan konsisten",
    sku: "BLENDER-PREMIUM-001",
    basePrice: 850000,
    imageUrls: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Home & Living",
    weightGrams: 1500,
    dimensionsCm: {
      length: 25,
      width: 15,
      height: 35
    },
    isActive: true,
    createdAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z"
  },
  {
    productId: "prod-008",
    principalId: "principal-001",
    productName: "Tas Ransel Premium",
    description: "Tas ransel dengan bahan waterproof dan kompartemen laptop",
    sku: "TAS-RANSEL-001",
    basePrice: 450000,
    imageUrls: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Fashion",
    weightGrams: 800,
    dimensionsCm: {
      length: 40,
      width: 30,
      height: 15
    },
    isActive: true,
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z"
  },
  {
    productId: "prod-009",
    principalId: "principal-001",
    productName: "Smart Watch Series 8",
    description: "Smartwatch dengan fitur kesehatan dan GPS terintegrasi",
    sku: "SMARTWATCH-001",
    basePrice: 3500000,
    imageUrls: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Elektronik",
    weightGrams: 50,
    dimensionsCm: {
      length: 4,
      width: 4,
      height: 1.2
    },
    isActive: true,
    createdAt: "2024-01-16T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z"
  },
  {
    productId: "prod-010",
    principalId: "principal-001",
    productName: "Vitamin C 1000mg",
    description: "Suplemen vitamin C dengan dosis tinggi untuk daya tahan tubuh",
    sku: "VITAMIN-C-001",
    basePrice: 150000,
    imageUrls: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Kesehatan",
    weightGrams: 100,
    dimensionsCm: {
      length: 8,
      width: 4,
      height: 4
    },
    isActive: true,
    createdAt: "2024-01-22T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z"
  }
];

// Distributor Products (dengan markup 15%)
export const distributorProducts: Product[] = principalProducts.map(product => ({
  ...product,
  basePrice: Math.round(product.basePrice * 1.15), // 15% markup
  productId: `dist-${product.productId}`,
}));

// Agent Products (dengan markup 25%)
export const agentProducts: Product[] = principalProducts.map(product => ({
  ...product,
  basePrice: Math.round(product.basePrice * 1.25), // 25% markup
  productId: `agent-${product.productId}`,
}));

// Reseller Products (dengan markup 35%)
export const resellerProducts: Product[] = principalProducts.map(product => ({
  ...product,
  basePrice: Math.round(product.basePrice * 1.35), // 35% markup
  productId: `reseller-${product.productId}`,
}));

// Customer Products (dengan markup 50%)
export const customerProducts: Product[] = principalProducts.map(product => ({
  ...product,
  basePrice: Math.round(product.basePrice * 1.50), // 50% markup
  productId: `customer-${product.productId}`,
}));



// Helper functions
export const getProductById = (productId: string) => {
  return principalProducts.find(product => product.productId === productId);
};

export const getInventoryByProductId = (productId: string) => {
  return inventory.find(inv => inv.productId === productId);
};

export const getProductsByPrincipal = (principalId: string) => {
  return principalProducts.filter(product => product.principalId === principalId);
};

export const getProductsByCategory = (category: string) => {
  return principalProducts.filter(product => product.category === category);
};

export const getActiveProducts = () => {
  return principalProducts.filter(product => product.isActive);
};

export const getFactoryById = (factoryId: string) => {
  return factories.find(factory => factory.factoryId === factoryId);
};

export const getInventoryByFactory = (factoryId: string) => {
  return inventory.filter(inv => inv.factoryId === factoryId);
};

// Review helper functions
export const getReviewsByProductId = (productId: string) => {
  return mockReviews.filter(review => review.productId === productId);
};

export const getAverageRatingByProductId = (productId: string) => {
  const reviews = getReviewsByProductId(productId);
  if (reviews.length === 0) return 0;

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

export const getReviewCountByProductId = (productId: string) => {
  return getReviewsByProductId(productId).length;
};

// Recommendation helper functions
export const getRecommendedProducts = (type: 'featured' | 'trending' | 'similar' | 'admin_pick' | 'best_seller' = 'featured', limit: number = 6) => {
  const recommendations = mockProductRecommendations
    .filter(rec => rec.recommendationType === type && rec.isActive)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);

  return recommendations.map(rec => {
    const product = getProductById(rec.productId);
    return {
      ...product,
      recommendationType: rec.recommendationType,
      priority: rec.priority,
      algorithm: rec.algorithm
    };
  }).filter(Boolean);
};

export const getSimilarProducts = (currentProductId: string, limit: number = 4) => {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return [];

  // Get products in the same category
  const similarProducts = principalProducts
    .filter(product =>
      product.productId !== currentProductId &&
      product.category === currentProduct.category
    )
    .slice(0, limit);

  return similarProducts;
};

// Get products by role
export const getProductsByRole = (role: string) => {
  switch (role) {
    case 'principal':
      return principalProducts;
    case 'distributor':
      return distributorProducts;
    case 'agent':
      return agentProducts;
    case 'reseller':
      return resellerProducts;
    case 'customer':
      return customerProducts;
    default:
      return principalProducts;
  }
};