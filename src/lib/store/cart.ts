import { create } from 'zustand';
import { carts, type Cart, type CartItem } from '../data/cart';
import { useAuth } from './auth';
import { useProducts } from './products';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  
  // Cart operations
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Cart calculations
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  error: null,

  addToCart: (productId, quantity) => {
    const user = useAuth.getState().user;
    if (!user || user.role !== 'customer') return;

    const product = useProducts.getState().getProductById(productId);
    if (!product) return;

    set((state) => {
      const currentCart = state.cart || {
        customerId: user.id,
        items: [],
        updatedAt: new Date().toISOString(),
      };

      const existingItem = currentCart.items.find(
        (item) => item.productId === productId
      );

      const newItems = existingItem
        ? currentCart.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...currentCart.items, { productId, quantity }];

      return {
        cart: {
          ...currentCart,
          items: newItems,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      if (!state.cart) return state;

      return {
        cart: {
          ...state.cart,
          items: state.cart.items.filter((item) => item.productId !== productId),
          updatedAt: new Date().toISOString(),
        },
      };
    });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return;

    set((state) => {
      if (!state.cart) return state;

      return {
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    });
  },

  clearCart: () => {
    set({ cart: null });
  },

  getCartTotal: () => {
    const cart = get().cart;
    if (!cart) return 0;

    return cart.items.reduce((total, item) => {
      const product = useProducts.getState().getProductById(item.productId);
      if (!product) return total;

      const discountedPrice = product.price * (1 - product.discount / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  },

  getCartItemsCount: () => {
    const cart = get().cart;
    if (!cart) return 0;

    return cart.items.reduce((count, item) => count + item.quantity, 0);
  },
})); 