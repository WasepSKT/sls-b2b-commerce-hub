import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { Star, Package, Truck } from "lucide-react";
import { Product, Inventory } from "@/lib/data/products";

interface ProductInfoProps {
  product: Product;
  averageRating: number;
  reviewCount: number;
  inventory: Inventory | undefined;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  averageRating,
  reviewCount,
  inventory
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {/* Category and Rating */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={cn(
            isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"
          )}>
            {product.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className={cn(
              "text-sm font-medium",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              {averageRating.toFixed(1)}
            </span>
            <span className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              ({reviewCount} ulasan)
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h1 className={cn(
          "text-3xl font-bold leading-tight",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>
          {product.productName}
        </h1>

        {/* Price */}
        <div className="text-4xl font-bold text-blue-600">
          Rp {product.basePrice.toLocaleString()}
        </div>

        {/* Stock and Shipping Info */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-gray-500" />
            <span className={cn(
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}>
              Stok: {inventory?.quantityOnHand || 0} unit
            </span>
          </div>
          <div className="flex items-center">
            <Truck className="h-4 w-4 mr-2 text-green-500" />
            <span className={cn(
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}>
              Gratis ongkir
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo; 