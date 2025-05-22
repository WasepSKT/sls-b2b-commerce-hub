import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { ArrowLeft, PackageSearch, Truck, CheckCircle2, Clock, AlertTriangle, Package } from "lucide-react";
import { Link } from "react-router-dom";

const CustomerOrderTracking = () => {
  const { isDarkMode } = useTheme();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  
  // Simulated tracking data
  const trackingDetails = {
    orderNumber: "ORD-1234",
    trackingNumber: "JNE-12345678",
    status: "Dalam Pengiriman",
    estimatedDelivery: "22 Mei 2025",
    origin: "Jakarta",
    destination: "Bandung",
    carrier: "JNE Express",
    history: [
      { 
        date: "20 Mei 2025 08:30", 
        status: "Paket telah dikirim", 
        location: "Jakarta Pusat",
        icon: Truck
      },
      { 
        date: "19 Mei 2025 16:45", 
        status: "Paket sedang diproses di gudang", 
        location: "Jakarta Pusat",
        icon: Package
      },
      { 
        date: "19 Mei 2025 10:15", 
        status: "Pesanan dikonfirmasi", 
        location: "Jakarta Pusat",
        icon: CheckCircle2
      },
      { 
        date: "18 Mei 2025 14:30", 
        status: "Pesanan diterima", 
        location: "Online",
        icon: Clock
      },
    ]
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <DashboardLayout role="customer" pageTitle="Lacak Pesanan">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Lacak Pesanan</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Masukkan nomor resi untuk melacak status pengiriman pesanan Anda
            </p>
          </div>
          <Link to="/dashboard/customer/orders">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "hover:bg-gray-100"
              )}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Pesanan
            </Button>
          </Link>
        </div>

        <Card className={cn(
          "transition-colors duration-300",
          isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        )}>
          <CardHeader>
            <CardTitle className={cn(
              "text-lg font-semibold",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Masukkan Nomor Resi</CardTitle>
            <CardDescription className={cn(
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              Lacak pesanan Anda dengan mudah menggunakan nomor resi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="text" 
                placeholder="Masukkan nomor resi pengiriman" 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className={cn(
                  "flex-1",
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}
              />
              <Button 
                type="submit"
                className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : ""
                )}
              >
                <PackageSearch className="mr-2 h-4 w-4" />
                Lacak Pesanan
              </Button>
            </form>
          </CardContent>
        </Card>

        {isTracking && (
          <>
            <Card className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle className={cn(
                  "text-lg font-semibold",
                  isDarkMode ? "text-gray-50" : "text-slate-900"
                )}>Informasi Pengiriman</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <p className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>Nomor Pesanan</p>
                      <p className={cn(
                        "text-base font-semibold",
                        isDarkMode ? "text-gray-100" : ""
                      )}>{trackingDetails.orderNumber}</p>
                    </div>
                    <div>
                      <p className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>Nomor Resi</p>
                      <p className={cn(
                        "text-base font-semibold",
                        isDarkMode ? "text-gray-100" : ""
                      )}>{trackingDetails.trackingNumber}</p>
                    </div>
                    <div>
                      <p className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>Status Pengiriman</p>
                      <Badge
                        className={cn(
                          "mt-1 border transition-colors hover:bg-opacity-0 hover:bg-transparent",
                          isDarkMode 
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30" 
                            : "bg-blue-100 text-blue-800 border-blue-300"
                        )}
                      >
                        {trackingDetails.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>Estimasi Tiba</p>
                      <p className={cn(
                        "text-base font-semibold",
                        isDarkMode ? "text-gray-100" : ""
                      )}>{trackingDetails.estimatedDelivery}</p>
                    </div>
                    <div>
                      <p className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>Kurir</p>
                      <p className={cn(
                        "text-base font-semibold",
                        isDarkMode ? "text-gray-100" : ""
                      )}>{trackingDetails.carrier}</p>
                    </div>
                    <div>
                      <p className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>Rute</p>
                      <p className={cn(
                        "text-base font-semibold",
                        isDarkMode ? "text-gray-100" : ""
                      )}>{trackingDetails.origin} → {trackingDetails.destination}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle className={cn(
                  "text-lg font-semibold",
                  isDarkMode ? "text-gray-50" : "text-slate-900"
                )}>Status Pengiriman</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative ml-2">
                  {/* Vertical Timeline Line */}
                  <div 
                    className={cn(
                      "absolute top-0 left-3.5 transform -translate-x-1/2 h-full w-0.5",
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    )} 
                  />
                  
                  {/* Timeline Items */}
                  <div className="space-y-8">
                    {trackingDetails.history.map((item, index) => (
                      <div key={index} className="relative z-10">
                        <div className="flex items-start">
                          <div className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center mr-4 z-10",
                            index === 0 
                              ? isDarkMode 
                                ? "bg-blue-600" 
                                : "bg-blue-500"
                              : isDarkMode 
                                ? "bg-gray-700" 
                                : "bg-gray-200"
                          )}>
                            {index === 0 ? (
                              <Truck className={cn(
                                "h-4 w-4 text-white"
                              )} />
                            ) : item.status.includes("dikonfirmasi") ? (
                              <CheckCircle2 className={cn(
                                "h-4 w-4",
                                isDarkMode ? "text-gray-300" : "text-gray-500"
                              )} />
                            ) : item.status.includes("diproses") ? (
                              <Package className={cn(
                                "h-4 w-4",
                                isDarkMode ? "text-gray-300" : "text-gray-500"
                              )} />
                            ) : (
                              <Clock className={cn(
                                "h-4 w-4",
                                isDarkMode ? "text-gray-300" : "text-gray-500"
                              )} />
                            )}
                          </div>

                          <div>
                            <p className={cn(
                              "font-medium",
                              isDarkMode ? "text-gray-100" : "text-gray-900"
                            )}>{item.status}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
                              <span className={cn(
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              )}>{item.date}</span>
                              <span className={cn(
                                "hidden sm:block text-xs",
                                isDarkMode ? "text-gray-600" : "text-gray-400"
                              )}>•</span>
                              <span className={cn(
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              )}>{item.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerOrderTracking; 