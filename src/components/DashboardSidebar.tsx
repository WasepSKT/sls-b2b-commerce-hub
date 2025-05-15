
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Box,
  Building,
  CreditCard,
  LogOut, 
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  role: "principal" | "agent" | "customer";
}

const DashboardSidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const principalLinks = [
    { name: "Dashboard", href: "/dashboard/principal", icon: BarChart },
    { name: "Produk", href: "/dashboard/principal/products", icon: Package },
    { name: "Agen", href: "/dashboard/principal/agents", icon: Users },
    { name: "Pelanggan", href: "/dashboard/principal/customers", icon: Building },
    { name: "Pesanan", href: "/dashboard/principal/orders", icon: ShoppingCart },
    { name: "Laporan", href: "/dashboard/principal/reports", icon: BarChart },
    { name: "Pengaturan", href: "/dashboard/principal/settings", icon: Settings },
  ];

  const agentLinks = [
    { name: "Dashboard", href: "/dashboard/agent", icon: BarChart },
    { name: "Katalog", href: "/dashboard/agent/catalog", icon: Package },
    { name: "Pelanggan", href: "/dashboard/agent/customers", icon: Building },
    { name: "Pesanan", href: "/dashboard/agent/orders", icon: ShoppingCart },
    { name: "Komisi", href: "/dashboard/agent/commissions", icon: CreditCard },
    { name: "Pengaturan", href: "/dashboard/agent/settings", icon: Settings },
  ];

  const customerLinks = [
    { name: "Dashboard", href: "/dashboard/customer", icon: BarChart },
    { name: "Katalog", href: "/dashboard/customer/catalog", icon: Package },
    { name: "Keranjang", href: "/dashboard/customer/cart", icon: ShoppingCart },
    { name: "Pesanan", href: "/dashboard/customer/orders", icon: Box },
    { name: "Pembayaran", href: "/dashboard/customer/payments", icon: CreditCard },
    { name: "Pengaturan", href: "/dashboard/customer/settings", icon: Settings },
  ];

  const navLinks = role === "principal" ? principalLinks : role === "agent" ? agentLinks : customerLinks;

  const getRoleName = () => {
    switch (role) {
      case "principal":
        return "Principal";
      case "agent":
        return "Agen";
      case "customer":
        return "Pelanggan B2B";
      default:
        return "";
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!collapsed && (
            <Link to={`/dashboard/${role}`} className="flex items-center">
              <span className="text-xl font-semibold text-primary truncate">SLS-B2B</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100",
              collapsed ? "mx-auto" : ""
            )}
          >
            {collapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
          </button>
        </div>

        {!collapsed && (
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-500">Login sebagai</p>
            <p className="text-sm font-semibold text-gray-900">{getRoleName()}</p>
          </div>
        )}

        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                    )}
                  >
                    <link.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                    {!collapsed && <span>{link.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-2 py-4 border-t border-gray-200">
          <Link to="/">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
                collapsed && "justify-center"
              )}
            >
              <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && "Keluar"}
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
