export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  images: string[];
  principalId: string;
  specifications: Record<string, string>;
  createdAt: string;
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Premium Laptop Pro X1",
    description: "High-performance laptop for professionals with latest generation processor",
    price: 15000000,
    discount: 10,
    stock: 50,
    category: "Electronics",
    images: ["/products/laptop-1.jpg", "/products/laptop-2.jpg", "/products/laptop-3.jpg"],
    principalId: "principal-1",
    specifications: {
      "Processor": "Intel Core i7 12th Gen",
      "RAM": "16GB DDR4",
      "Storage": "512GB SSD",
      "Display": "15.6 inch 4K",
    },
    createdAt: "2024-01-15T08:00:00Z"
  },
  {
    id: "prod-2",
    name: "Business Suit Premium",
    description: "High-quality business suit made from imported materials",
    price: 2500000,
    discount: 0,
    stock: 100,
    category: "Fashion",
    images: ["/products/suit-1.jpg", "/products/suit-2.jpg"],
    principalId: "principal-1",
    specifications: {
      "Material": "Italian Wool",
      "Size": "M, L, XL",
      "Color": "Navy Blue",
      "Style": "Modern Fit",
    },
    createdAt: "2024-01-20T10:00:00Z"
  },
  {
    id: "prod-3",
    name: "Smart Office Chair",
    description: "Ergonomic office chair with smart features",
    price: 3500000,
    discount: 15,
    stock: 30,
    category: "Home",
    images: ["/products/chair-1.jpg", "/products/chair-2.jpg"],
    principalId: "principal-1",
    specifications: {
      "Material": "Premium Mesh",
      "Weight Capacity": "150 kg",
      "Features": "Adjustable Height, Lumbar Support",
      "Warranty": "3 Years",
    },
    createdAt: "2024-02-01T09:00:00Z"
  },
  {
    id: "prod-4",
    name: "Professional Camera Kit",
    description: "Complete professional camera kit for photography enthusiasts",
    price: 25000000,
    discount: 5,
    stock: 15,
    category: "Electronics",
    images: ["/products/camera-1.jpg", "/products/camera-2.jpg", "/products/camera-3.jpg"],
    principalId: "principal-1",
    specifications: {
      "Sensor": "Full Frame 45MP",
      "Video": "8K 30fps",
      "Storage": "Dual SD Card Slots",
      "Battery": "2000mAh",
    },
    createdAt: "2024-02-10T11:00:00Z"
  }
]; 