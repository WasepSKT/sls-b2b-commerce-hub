import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  label: string;
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AddressStore {
  addresses: Address[];
  defaultAddressId: string | null;

  // Actions
  addAddress: (address: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => Address | null;
  getAddressById: (id: string) => Address | null;
  getActiveAddresses: () => Address[];
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [
        {
          id: 'addr-1',
          label: 'Rumah',
          recipient: 'Budi Santoso',
          street: 'Jl. Merdeka No. 123',
          city: 'Jakarta Selatan',
          province: 'DKI Jakarta',
          postalCode: '12150',
          phone: '081234567890',
          isDefault: true,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'addr-2',
          label: 'Kantor',
          recipient: 'Budi Santoso',
          street: 'Gedung Centennial Tower Lt. 28, Jl. Gatot Subroto Kav. 24-25',
          city: 'Jakarta Selatan',
          province: 'DKI Jakarta',
          postalCode: '12930',
          phone: '081234567890',
          isDefault: false,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ],
      defaultAddressId: 'addr-1',

      addAddress: (address) => {
        const newAddress: Address = {
          ...address,
          id: `addr-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => {
          let updatedAddresses = [...state.addresses, newAddress];

          // If this is the first address or marked as default, set it as default
          if (newAddress.isDefault || state.addresses.length === 0) {
            updatedAddresses = updatedAddresses.map(addr => ({
              ...addr,
              isDefault: addr.id === newAddress.id
            }));
            return {
              addresses: updatedAddresses,
              defaultAddressId: newAddress.id
            };
          }

          return { addresses: updatedAddresses };
        });
      },

      updateAddress: (id, address) => {
        set((state) => {
          const updatedAddresses = state.addresses.map(addr => {
            if (addr.id === id) {
              const updated = { ...addr, ...address, updatedAt: new Date().toISOString() };

              // If setting as default, update other addresses
              if (address.isDefault) {
                return updated;
              }

              return updated;
            }
            return addr;
          });

          // If setting as default, update other addresses
          if (address.isDefault) {
            const finalAddresses = updatedAddresses.map(addr => ({
              ...addr,
              isDefault: addr.id === id
            }));

            return {
              addresses: finalAddresses,
              defaultAddressId: id
            };
          }

          return { addresses: updatedAddresses };
        });
      },

      deleteAddress: (id) => {
        set((state) => {
          const addressToDelete = state.addresses.find(addr => addr.id === id);
          const remainingAddresses = state.addresses.filter(addr => addr.id !== id);

          // If deleting default address, set first remaining address as default
          if (addressToDelete?.isDefault && remainingAddresses.length > 0) {
            const updatedAddresses = remainingAddresses.map((addr, index) => ({
              ...addr,
              isDefault: index === 0
            }));

            return {
              addresses: updatedAddresses,
              defaultAddressId: remainingAddresses[0]?.id || null
            };
          }

          return { addresses: remainingAddresses };
        });
      },

      setDefaultAddress: (id) => {
        set((state) => {
          const updatedAddresses = state.addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id,
            updatedAt: addr.id === id ? new Date().toISOString() : addr.updatedAt
          }));

          return {
            addresses: updatedAddresses,
            defaultAddressId: id
          };
        });
      },

      getDefaultAddress: () => {
        const state = get();
        return state.addresses.find(addr => addr.isDefault) || null;
      },

      getAddressById: (id) => {
        const state = get();
        return state.addresses.find(addr => addr.id === id) || null;
      },

      getActiveAddresses: () => {
        const state = get();
        return state.addresses.filter(addr => addr.isActive);
      },
    }),
    {
      name: 'address-store',
    }
  )
); 