import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { StatusBadge } from "@/components/ui";
import { Clock, Package, Truck, CheckCircle, XCircle } from "lucide-react";

interface OrderStatusCardProps {
  order: {
    orderId: string;
    orderNumber: string;
    orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    orderDate: string;
    estimatedDelivery?: string;
    totalAmount: number;
    itemsCount: number;
    customerName: string;
  };
  className?: string;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  order,
  className
}) => {
  const { isDarkMode } = useTheme();

  const statusConfig = {
    pending: {
      label: "Menunggu Pembayaran",
      icon: Clock,
      color: "warning" as const,
    },
    processing: {
      label: "Sedang Diproses",
      icon: Package,
      color: "info" as const,
    },
    shipped: {
      label: "Dikirim",
      icon: Truck,
      color: "info" as const,
    },
    delivered: {
      label: "Terkirim",
      icon: CheckCircle,
      color: "success" as const,
    },
    cancelled: {
      label: "Dibatalkan",
      icon: XCircle,
      color: "error" as const,
    },
  };

  const config = statusConfig[order.orderStatus];
  const IconComponent = config.icon;

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={cn(
              "text-lg",
              isDarkMode ? "text-gray-200" : "text-gray-900"
            )}>
              Order #{order.orderNumber}
            </CardTitle>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              {order.customerName}
            </p>
          </div>
          <StatusBadge status={config.color}>
            {config.label}
          </StatusBadge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <IconComponent className={cn(
            "h-5 w-5",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )} />
          <div>
            <p className={cn(
              "text-sm font-medium",
              isDarkMode ? "text-gray-200" : "text-gray-900"
            )}>
              Status: {config.label}
            </p>
            <p className={cn(
              "text-xs",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Order Date: {new Date(order.orderDate).toLocaleDateString('id-ID')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className={cn(
              "font-medium",
              isDarkMode ? "text-gray-200" : "text-gray-900"
            )}>
              Total Amount
            </p>
            <p className={cn(
              "text-lg font-bold",
              isDarkMode ? "text-gray-200" : "text-gray-900"
            )}>
              Rp {order.totalAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className={cn(
              "font-medium",
              isDarkMode ? "text-gray-200" : "text-gray-900"
            )}>
              Items
            </p>
            <p className={cn(
              "text-lg font-bold",
              isDarkMode ? "text-gray-200" : "text-gray-900"
            )}>
              {order.itemsCount} items
            </p>
          </div>
        </div>

        {order.estimatedDelivery && (
          <div className={cn(
            "p-3 rounded-md",
            isDarkMode ? "bg-gray-700" : "bg-gray-50"
          )}>
            <p className={cn(
              "text-sm font-medium",
              isDarkMode ? "text-gray-200" : "text-gray-900"
            )}>
              Estimated Delivery
            </p>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              {new Date(order.estimatedDelivery).toLocaleDateString('id-ID')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderStatusCard; 