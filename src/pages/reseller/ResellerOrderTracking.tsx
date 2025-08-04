import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { getOrdersByReseller, getOrderStatusColor, getOrderStatusColorDark, getPaymentStatusColor, getPaymentStatusColorDark, getOrderItemsByOrderId } from "@/lib/data/orders";
import { getProductsByRole } from "@/lib/data/products";
import { getUserProfileByUserId } from "@/lib/data/users";
import { useAuth } from "@/lib/store/auth";
import { Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";

const ResellerOrderTracking = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Get orders for current reseller
  const orders = user ? getOrdersByReseller(user.userId) : [];
  const products = getProductsByRole('reseller');

  const handleTrackOrder = (orderId: string) => {
    setSelectedOrder(orderId);
    setIsTrackingModalOpen(true);
  };

  const getTrackingSteps = (orderStatus: string) => {
    const steps = [
      { status: "Pesanan Dibuat", completed: true, icon: Package },
      { status: "Pembayaran Dikonfirmasi", completed: orderStatus !== 'pending', icon: CheckCircle },
      { status: "Pesanan Diproses", completed: ['confirmed', 'processing', 'shipped', 'delivered'].includes(orderStatus), icon: Clock },
      { status: "Pesanan Dikirim", completed: ['shipped', 'delivered'].includes(orderStatus), icon: Truck },
      { status: "Pesanan Diterima", completed: orderStatus === 'delivered', icon: CheckCircle },
    ];

    if (orderStatus === 'cancelled') {
      return [
        { status: "Pesanan Dibuat", completed: true, icon: Package },
        { status: "Pesanan Dibatalkan", completed: true, icon: AlertCircle },
      ];
    }

    return steps;
  };

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada pesanan</h3>
          <p className="mt-1 text-sm text-gray-500">
            Anda belum memiliki pesanan untuk dilacak.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
          Lacak Pesanan
        </h2>
        <p className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-500")}>
          Lacak status pengiriman pesanan Anda
        </p>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.orderId} className={cn(
            "transition-all duration-300",
            isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className={cn(
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    {order.orderId}
                  </CardTitle>
                  <CardDescription className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Dibuat pada {new Date(order.orderDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={cn(
                    isDarkMode
                      ? getOrderStatusColorDark(order.orderStatus)
                      : getOrderStatusColor(order.orderStatus)
                  )}>
                    {order.orderStatus === 'pending' && 'Menunggu'}
                    {order.orderStatus === 'confirmed' && 'Dikonfirmasi'}
                    {order.orderStatus === 'processing' && 'Diproses'}
                    {order.orderStatus === 'shipped' && 'Dikirim'}
                    {order.orderStatus === 'delivered' && 'Terkirim'}
                    {order.orderStatus === 'cancelled' && 'Dibatalkan'}
                  </Badge>
                  <Badge className={cn(
                    isDarkMode
                      ? getPaymentStatusColorDark(order.paymentStatus)
                      : getPaymentStatusColor(order.paymentStatus)
                  )}>
                    {order.paymentStatus === 'pending' && 'Menunggu Bayar'}
                    {order.paymentStatus === 'paid' && 'Lunas'}
                    {order.paymentStatus === 'failed' && 'Gagal'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className={cn(
                  "text-lg font-semibold mb-3",
                  isDarkMode ? "text-gray-300" : "text-gray-900"
                )}>
                  Item Pesanan
                </h3>
                <div className="space-y-3">
                  {getOrderItemsByOrderId(order.orderId).map((item) => {
                    const product = products.find(p => p.productId === item.productId);
                    return (
                      <div key={item.orderItemId} className={cn(
                        "flex items-center space-x-4 p-3 rounded-lg border",
                        isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
                      )}>
                        <img
                          src={product?.imageUrls[0] || "/placeholder-product.jpg"}
                          alt={product?.productName || "Product"}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className={cn(
                            "font-medium",
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          )}>
                            {product?.productName || "Product"}
                          </h4>
                          <p className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>
                            Qty: {item.quantity} × Rp {item.unitPriceAtOrder.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            "font-medium",
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          )}>
                            Rp {item.subtotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className={cn(
                "border-t pt-4",
                isDarkMode ? "border-gray-700" : "border-gray-200"
              )}>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={cn(isDarkMode ? "text-gray-300" : "text-gray-600")}>
                      Subtotal
                    </span>
                    <span className={cn("font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                      Rp {(order.totalAmount - order.shippingCost).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={cn(isDarkMode ? "text-gray-300" : "text-gray-600")}>
                      Biaya Pengiriman
                    </span>
                    <span className={cn("font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                      Rp {order.shippingCost.toLocaleString()}
                    </span>
                  </div>
                  <div className={cn(
                    "flex justify-between pt-2 border-t",
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <span className={cn("font-semibold", isDarkMode ? "text-white" : "text-gray-900")}>
                      Total
                    </span>
                    <span className={cn("font-semibold", isDarkMode ? "text-white" : "text-gray-900")}>
                      Rp {order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className={cn(
                  "text-lg font-semibold mb-3",
                  isDarkMode ? "text-gray-300" : "text-gray-900"
                )}>
                  Alamat Pengiriman
                </h3>
                <div className={cn(
                  "p-3 rounded-lg border",
                  isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
                )}>
                  <p className={cn("font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                    {order.shippingAddressJson.name}
                  </p>
                  <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    {order.shippingAddressJson.address}
                  </p>
                  <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    {order.shippingAddressJson.city}, {order.shippingAddressJson.state} {order.shippingAddressJson.zipCode}
                  </p>
                  <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    {order.shippingAddressJson.phone}
                  </p>
                </div>
              </div>

              {/* Track Button */}
              <div className="flex justify-end">
                <Button
                  onClick={() => handleTrackOrder(order.orderId)}
                  className={cn(
                    "bg-blue-600 hover:bg-blue-700 text-white",
                    isDarkMode ? "bg-blue-500 hover:bg-blue-600" : ""
                  )}
                >
                  Lacak Pengiriman
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tracking Modal */}
      <Dialog open={isTrackingModalOpen && selectedOrder !== null} onOpenChange={(open) => {
        if (!open) {
          setIsTrackingModalOpen(false);
          setSelectedOrder(null);
        }
      }}>
        <DialogContent className={cn("sm:max-w-2xl", isDarkMode ? "bg-gray-800" : "")}>
          <DialogHeader>
            <DialogTitle className={cn(isDarkMode ? "text-white" : "")}>
              Detail Pelacakan
            </DialogTitle>
            <DialogDescription className={cn(isDarkMode ? "text-gray-300" : "")}>
              Status pengiriman pesanan Anda
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (() => {
            const order = orders.find(o => o.orderId === selectedOrder);
            if (!order) return null;
            
            const trackingSteps = getTrackingSteps(order.orderStatus);
            
            return (
              <div className="space-y-6">
                <div className={cn(
                  "p-4 rounded-lg border",
                  isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
                )}>
                  <h3 className={cn("font-semibold mb-2", isDarkMode ? "text-white" : "text-gray-900")}>
                    Pesanan #{order.orderId}
                  </h3>
                  <p className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                    {order.trackingNumber && `No. Resi: ${order.trackingNumber}`}
                  </p>
                </div>

                <div className="space-y-4">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        step.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-500"
                      )}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className={cn(
                          "font-medium",
                          step.completed
                            ? isDarkMode ? "text-white" : "text-gray-900"
                            : isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                          {step.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResellerOrderTracking;
