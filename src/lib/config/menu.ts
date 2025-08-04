import {
  BarChart,
  Box,
  Building,
  CreditCard,
  DollarSign,
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

export interface MenuItem {
  name: string;
  href: string;
  icon: any;
  divider?: boolean;
}

export interface MenuConfig {
  [key: string]: MenuItem[];
}

export const menuConfig: MenuConfig = {
  reseller: [
    // Dashboard
    { name: "Dashboard", href: "/dashboard/reseller", icon: Home },

    // Belanja Pribadi
    { name: "Belanja Pribadi", href: "#", icon: ShoppingCart, divider: true },
    { name: "Belanja", href: "/dashboard/reseller/shopping", icon: ShoppingCart },
    { name: "Keranjang Belanja", href: "/dashboard/reseller/cart", icon: ShoppingCart },
    { name: "Checkout", href: "/dashboard/reseller/checkout", icon: ShoppingCart },
    { name: "Lacak Pesanan", href: "/dashboard/reseller/order-tracking", icon: LineChart },
    { name: "Riwayat Pesanan", href: "/dashboard/reseller/order-history", icon: LineChart },

    // Bisnis Reseller
    { name: "Bisnis Reseller", href: "#", icon: Package, divider: true },
    { name: "Katalog Produk", href: "/dashboard/reseller/catalog", icon: Package },
    { name: "Dasbor Penjualan", href: "/dashboard/reseller/sales-dashboard", icon: BarChart },
    { name: "Laporan Komisi", href: "/dashboard/reseller/commission-report", icon: DollarSign },
    { name: "Direktori Agent", href: "/dashboard/reseller/agent-directory", icon: Users },
  ],
  principal: [
    { name: "Dashboard", href: "/dashboard/principal", icon: BarChart },
    { name: "Produk", href: "/dashboard/principal/products", icon: Package },
    { name: "Agen", href: "/dashboard/principal/agents", icon: Users },
    { name: "Pelanggan", href: "/dashboard/principal/customers", icon: Building },
    { name: "Pesanan", href: "/dashboard/principal/orders", icon: ShoppingCart },
    { name: "Laporan", href: "/dashboard/principal/reports", icon: BarChart },
    { name: "Pengaturan", href: "/dashboard/principal/settings", icon: Settings },
  ],
  distributor: [
    { name: "Dashboard", href: "/dashboard/distributor", icon: BarChart },
    { name: "Produk", href: "/dashboard/distributor/products", icon: Package },
    { name: "Inventaris", href: "/dashboard/distributor/inventory", icon: Box },
    { name: "Agen", href: "/dashboard/distributor/agents", icon: Users },
    { name: "Pesanan", href: "/dashboard/distributor/orders", icon: ShoppingCart },
    { name: "Laporan", href: "/dashboard/distributor/reports", icon: BarChart },
    { name: "Pengaturan", href: "/dashboard/distributor/settings", icon: Settings },
  ],
  agent: [
    { name: "Dashboard", href: "/dashboard/agent", icon: BarChart },
    { name: "Katalog", href: "/dashboard/agent/catalog", icon: Package },
    { name: "Pelanggan", href: "/dashboard/agent/customers", icon: Building },
    { name: "Pesanan", href: "/dashboard/agent/orders", icon: ShoppingCart },
    { name: "Komisi", href: "/dashboard/agent/commissions", icon: CreditCard },
    { name: "Pengaturan", href: "/dashboard/agent/settings", icon: Settings },
  ],
  customer: [
    { name: "Dashboard", href: "/dashboard/customer", icon: BarChart },
    { name: "Katalog", href: "/dashboard/customer/catalog", icon: Package },
    { name: "Keranjang", href: "/dashboard/customer/cart", icon: ShoppingCart },
    { name: "Pesanan", href: "/dashboard/customer/orders", icon: Box },
    { name: "Pembayaran", href: "/dashboard/customer/payments", icon: CreditCard },
    { name: "Pengaturan", href: "/dashboard/customer/settings", icon: Settings },
  ],
};

export const getRoleName = (role: string): string => {
  const roleNames: { [key: string]: string } = {
    principal: "Principal",
    distributor: "Distributor",
    agent: "Agen",
    customer: "Pelanggan B2B",
    reseller: "Reseller",
  };
  return roleNames[role] || "";
}; 