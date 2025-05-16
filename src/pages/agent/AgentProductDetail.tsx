import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Tag,
  Percent,
  Star,
  Share2
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

const AgentProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Dummy data untuk contoh
  const product = {
    id: productId,
    name: "Produk Premium A",
    description: "Produk berkualitas tinggi dengan fitur terbaik di kelasnya. Dilengkapi dengan berbagai keunggulan dan teknologi terkini untuk memenuhi kebutuhan pelanggan.",
    price: "Rp 1.500.000",
    stock: 25,
    commission: "10%",
    rating: 4.8,
    sales: 120,
    category: "Electronics",
    image: "",
    tags: ["Premium", "Bestseller"],
    specifications: [
      { label: "Merek", value: "Brand X" },
      { label: "Model", value: "X-2024" },
      { label: "Garansi", value: "1 Tahun" },
      { label: "Kondisi", value: "Baru" }
    ]
  };

  const renderRatingStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={cn(
          "h-4 w-4",
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <DashboardLayout role="agent" pageTitle="Detail Produk">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className={cn(
              "transition-colors duration-200",
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-200 hover:bg-gray-100"
            )}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div className="flex-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Detail Produk</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Informasi lengkap tentang produk
            </p>
          </div>
          <Button
            variant="outline"
            className={cn(
              "transition-colors duration-200",
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-200 hover:bg-gray-100"
            )}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className={cn(
            "overflow-hidden",
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          )}>
            <div className="aspect-[4/3] relative">
              <img
                src={product.image || "https://placehold.co/800x600/gray/white?text=Product+Image"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={cn(
                      "px-2.5 py-1 text-xs rounded-full font-medium shadow-sm",
                      tag === "Premium"
                        ? "bg-yellow-500/90 text-white"
                        : "bg-blue-500/90 text-white"
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card className={cn(
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          )}>
            <CardContent className="p-6 space-y-6">
              <div>
                <h1 className={cn(
                  "text-2xl font-bold mb-2",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>{product.name}</h1>
                <p className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>{product.description}</p>
              </div>

              <div className="flex items-center justify-between py-4 border-y border-dashed">
                <div>
                  <p className={cn(
                    "text-2xl font-bold",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>{product.price}</p>
                  <p className={cn(
                    "text-sm flex items-center text-green-500",
                  )}>
                    <Percent className="h-4 w-4 mr-1" />
                    Komisi {product.commission}
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>Stok Tersedia</p>
                  <p className={cn(
                    "text-lg font-semibold",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>{product.stock} unit</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderRatingStars(product.rating)}
                    <span className={cn(
                      "ml-2 text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>{product.rating}</span>
                  </div>
                  <span className={cn(
                    "text-sm px-2 py-1 rounded-full",
                    isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                  )}>
                    {product.sales} terjual
                  </span>
                  <span className={cn(
                    "text-sm px-2 py-1 rounded-full",
                    isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                  )}>
                    <Tag className="h-3.5 w-3.5 inline mr-1" />
                    {product.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className={cn(
                    "font-semibold",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>Spesifikasi</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="space-y-1">
                        <p className={cn(
                          "text-sm",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>{spec.label}</p>
                        <p className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Jual Sekarang
                </Button>
                <Button variant="outline" className={cn(
                  "flex-1",
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-200 hover:bg-gray-100"
                )}>
                  <Package className="h-4 w-4 mr-2" />
                  Tambah ke Katalog
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentProductDetail; 