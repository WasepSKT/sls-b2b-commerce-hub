import { create } from 'zustand';
import { orders, type Order } from '../data/orders';
import { useAuth } from './auth';

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  
  // Get orders based on user role
  getUserOrders: () => Order[];
  getOrderById: (id: string) => Order | undefined;
  
  // Order status management
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
}

export const useOrders = create<OrdersState>((set, get) => ({
  orders: orders,
  isLoading: false,
  error: null,

  getUserOrders: () => {
    const user = useAuth.getState().user;
    if (!user) return [];

    const { orders } = get();

    switch (user.role) {
      case 'customer':
        return orders.filter(order => order.customerId === user.id);
      case 'agent':
        return orders.filter(order => order.agentId === user.id);
      case 'principal':
        // For principal, show all orders that contain their products
        // This is a simplified version - in real app would need to check products
        return orders;
      case 'admin':
        // Admins can see all orders
        return orders;
      default:
        return [];
    }
  },

  getOrderById: (id) => {
    return get().orders.find((order) => order.id === id);
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ),
    }));
  },

  updatePaymentStatus: (orderId, paymentStatus) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, paymentStatus, updatedAt: new Date().toISOString() }
          : order
      ),
    }));
  },
})); 