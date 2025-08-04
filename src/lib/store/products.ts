import { create } from 'zustand';
import { customerProducts, type Product } from '../data/products';

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: string;

  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: string) => void;

  getFilteredProducts: () => Product[];
  getProductById: (id: string) => Product | undefined;
}

export const useProducts = create<ProductsState>((set, get) => ({
  products: customerProducts,
  isLoading: false,
  error: null,
  searchTerm: "",
  selectedCategory: "all",
  priceRange: [0, 5000000],
  sortBy: "newest",

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),

  getFilteredProducts: () => {
    const { products, searchTerm, selectedCategory, priceRange, sortBy } = get();

    let filtered = products.filter((product) => {
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice =
        product.basePrice >= priceRange[0] && product.basePrice <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.basePrice - b.basePrice;
        case "price-high":
          return b.basePrice - a.basePrice;
        case "name":
          return a.productName.localeCompare(b.productName);
        default: // "newest"
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  },

  getProductById: (id) => {
    return get().products.find((product) => product.productId === id);
  },
})); 