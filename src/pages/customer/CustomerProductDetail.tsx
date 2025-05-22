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
  Share2,
  Heart,
  Minus,
  Plus
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { useProducts } from "@/lib/store/products";
import { useCart } from "@/lib/store/cart";
import { useToast } from "@/hooks/use-toast";

const CustomerProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Get actual product data
  const product = getProductById(productId || "");
  
  // Handle cases where product is not found
  if (!product) {
    return (
      <DashboardLayout role="customer" pageTitle="Product Not Found">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className={cn(
            "text-2xl font-semibold mb-4",
            isDarkMode ? "text-gray-50" : "text-slate-900"
          )}>Product Not Found</h2>
          <p className={cn(
            "text-lg mb-6",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate("/dashboard/customer/catalog")}
            className={cn(
              "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            Back to Catalog
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const renderRatingStars = (rating: number = 4.5) => {
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

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} has been added to your cart`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    navigate("/dashboard/customer/cart");
  };

  return (
    <DashboardLayout role="customer" pageTitle="Product Detail">
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
            Back
          </Button>
          <div className="flex-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Product Details</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Complete information about the product
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
            <Heart className="h-4 w-4 mr-2" />
            Wishlist
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
                src={product.images[0] || "https://placehold.co/800x600/gray/white?text=Product+Image"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 right-4">
                  <span
                    className="px-2.5 py-1 text-xs rounded-full font-medium shadow-sm bg-red-500/90 text-white"
                  >
                    -{product.discount}% OFF
                  </span>
                </div>
              )}
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
                  )}>Rp {(product.price * (1 - product.discount / 100)).toLocaleString()}</p>
                  {product.discount > 0 && (
                    <p className={cn(
                      "text-sm line-through",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>
                      Rp {product.price.toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>Stock Available</p>
                  <p className={cn(
                    "text-lg font-semibold",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>{product.stock} units</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderRatingStars(4.8)}
                    <span className={cn(
                      "ml-2 text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>4.8</span>
                  </div>
                  <span className={cn(
                    "text-sm px-2 py-1 rounded-full",
                    isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                  )}>
                    120 sold
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
                  )}>Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index} className="space-y-1">
                        <p className={cn(
                          "text-sm",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>{key}</p>
                        <p className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <p className={cn(
                    "text-sm font-medium",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>Quantity:</p>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={cn(
                        "rounded-r-none h-9 w-9",
                        isDarkMode 
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
                          : "border-gray-200 hover:bg-gray-100"
                      )}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className={cn(
                      "px-3 h-9 flex items-center justify-center border-y",
                      isDarkMode ? "border-gray-600 text-white" : "border-gray-200 text-gray-900"
                    )}>
                      {quantity}
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className={cn(
                        "rounded-l-none h-9 w-9",
                        isDarkMode 
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
                          : "border-gray-200 hover:bg-gray-100"
                      )}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  className={cn(
                    "flex-1 transition-all duration-200",
                    "bg-blue-600 text-white hover:bg-blue-700",
                    "shadow-sm hover:shadow"
                  )}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
                <Button 
                  variant="outline" 
                  className={cn(
                    "flex-1 transition-all duration-200",
                    isDarkMode 
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
                      : "border-gray-200 hover:bg-gray-100",
                    "shadow-sm hover:shadow"
                  )}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerProductDetail; 