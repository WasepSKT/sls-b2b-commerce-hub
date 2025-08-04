export const SHIPPING_INFO = {
  standard: {
    name: "Pengiriman Standar",
    days: "3-5 hari kerja",
    cost: "Gratis",
    tracking: true,
    icon: "truck"
  },
  express: {
    name: "Pengiriman Express",
    days: "1-2 hari kerja", 
    cost: "Rp 50.000",
    tracking: true,
    icon: "rocket"
  }
};

export const GUARANTEE_INFO = {
  warranty: {
    name: "Garansi 100%",
    description: "Original",
    icon: "shield"
  },
  return: {
    name: "Return 7 Hari",
    description: "100% Refund",
    icon: "refresh"
  }
};

export const PRODUCT_TABS = [
  { id: "description", label: "Deskripsi" },
  { id: "specifications", label: "Spesifikasi" },
  { id: "reviews", label: "Ulasan" },
  { id: "shipping", label: "Pengiriman" }
] as const;

export const PRICE_RANGES = [
  { value: "all", label: "Semua Harga" },
  { value: "0-100000", label: "Rp 0 - 100.000" },
  { value: "100000-500000", label: "Rp 100.000 - 500.000" },
  { value: "500000-1000000", label: "Rp 500.000 - 1.000.000" },
  { value: "1000000+", label: "Rp 1.000.000+" }
] as const; 