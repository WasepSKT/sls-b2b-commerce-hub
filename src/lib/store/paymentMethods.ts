import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'bank_transfer' | 'ewallet' | 'virtual_account';
  name: string;
  info: string;
  accountNumber?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  bankName?: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaymentMethodStore {
  paymentMethods: PaymentMethod[];
  defaultPaymentMethodId: string | null;

  // Actions
  addPaymentMethod: (paymentMethod: Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePaymentMethod: (id: string, paymentMethod: Partial<PaymentMethod>) => void;
  deletePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  getDefaultPaymentMethod: () => PaymentMethod | null;
  getPaymentMethodById: (id: string) => PaymentMethod | null;
  getActivePaymentMethods: () => PaymentMethod[];
}

export const usePaymentMethodStore = create<PaymentMethodStore>()(
  persist(
    (set, get) => ({
      paymentMethods: [
        {
          id: 'pm-1',
          type: 'credit_card',
          name: 'VISA **** 1234',
          info: 'Kadaluwarsa: 05/26',
          cardNumber: '**** **** **** 1234',
          expiryDate: '05/26',
          cvv: '***',
          isDefault: true,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'pm-2',
          type: 'bank_transfer',
          name: 'Bank BCA',
          info: 'Transfer Manual',
          accountNumber: '1234567890',
          bankName: 'Bank BCA',
          isDefault: false,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'pm-3',
          type: 'ewallet',
          name: 'GoPay',
          info: '081234567890',
          accountNumber: '081234567890',
          isDefault: false,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ],
      defaultPaymentMethodId: 'pm-1',

      addPaymentMethod: (paymentMethod) => {
        const newPaymentMethod: PaymentMethod = {
          ...paymentMethod,
          id: `pm-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => {
          let updatedPaymentMethods = [...state.paymentMethods, newPaymentMethod];

          // If this is the first payment method or marked as default, set it as default
          if (newPaymentMethod.isDefault || state.paymentMethods.length === 0) {
            updatedPaymentMethods = updatedPaymentMethods.map(pm => ({
              ...pm,
              isDefault: pm.id === newPaymentMethod.id
            }));
            return {
              paymentMethods: updatedPaymentMethods,
              defaultPaymentMethodId: newPaymentMethod.id
            };
          }

          return { paymentMethods: updatedPaymentMethods };
        });
      },

      updatePaymentMethod: (id, paymentMethod) => {
        set((state) => {
          const updatedPaymentMethods = state.paymentMethods.map(pm => {
            if (pm.id === id) {
              const updated = { ...pm, ...paymentMethod, updatedAt: new Date().toISOString() };

              // If setting as default, update other payment methods
              if (paymentMethod.isDefault) {
                return updated;
              }

              return updated;
            }
            return pm;
          });

          // If setting as default, update other payment methods
          if (paymentMethod.isDefault) {
            const finalPaymentMethods = updatedPaymentMethods.map(pm => ({
              ...pm,
              isDefault: pm.id === id
            }));

            return {
              paymentMethods: finalPaymentMethods,
              defaultPaymentMethodId: id
            };
          }

          return { paymentMethods: updatedPaymentMethods };
        });
      },

      deletePaymentMethod: (id) => {
        set((state) => {
          const paymentMethodToDelete = state.paymentMethods.find(pm => pm.id === id);
          const remainingPaymentMethods = state.paymentMethods.filter(pm => pm.id !== id);

          // If deleting default payment method, set first remaining payment method as default
          if (paymentMethodToDelete?.isDefault && remainingPaymentMethods.length > 0) {
            const updatedPaymentMethods = remainingPaymentMethods.map((pm, index) => ({
              ...pm,
              isDefault: index === 0
            }));

            return {
              paymentMethods: updatedPaymentMethods,
              defaultPaymentMethodId: remainingPaymentMethods[0]?.id || null
            };
          }

          return { paymentMethods: remainingPaymentMethods };
        });
      },

      setDefaultPaymentMethod: (id) => {
        set((state) => {
          const updatedPaymentMethods = state.paymentMethods.map(pm => ({
            ...pm,
            isDefault: pm.id === id,
            updatedAt: pm.id === id ? new Date().toISOString() : pm.updatedAt
          }));

          return {
            paymentMethods: updatedPaymentMethods,
            defaultPaymentMethodId: id
          };
        });
      },

      getDefaultPaymentMethod: () => {
        const state = get();
        return state.paymentMethods.find(pm => pm.isDefault) || null;
      },

      getPaymentMethodById: (id) => {
        const state = get();
        return state.paymentMethods.find(pm => pm.id === id) || null;
      },

      getActivePaymentMethods: () => {
        const state = get();
        return state.paymentMethods.filter(pm => pm.isActive);
      },
    }),
    {
      name: 'payment-method-store',
    }
  )
); 