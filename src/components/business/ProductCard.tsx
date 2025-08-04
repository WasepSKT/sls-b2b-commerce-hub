import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { Card, CardContent, CardFooter } from "@/components/ui";
import {
  ShoppingCart,
  Star,
  Tag,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { getInventoryByProductId, Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, productName: string) => void;
  renderRatingStars: (rating: number) => JSX.Element[];
}

const ProductCard = ({ product, onAddToCart, renderRatingStars }: ProductCardProps) => {
  const { isDarkMode } = useTheme();

  const getPlaceholderImage = (width = 400, height = 300) => {
    const bgColor = isDarkMode ? '374151' : 'F3F4F6';
    const textColor = isDarkMode ? 'D1D5DB' : '6B7280';
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=Product+Image`;
  };

  const fallbackPlaceholder = "https://placehold.co/400x300/gray/white?text=Product+Image";

  return (
    <Card key={product.productId} className={cn(
      "overflow-hidden transition-all duration-300 group",
      isDarkMode
        ? "bg-gray-800 border-gray-700 hover:border-gray-600"
        : "bg-white border-gray-200 hover:border-gray-300"
    )}>
      <div className="relative aspect-[4/3]">
        <img
          src={product.imageUrls?.[0] || getPlaceholderImage()}
          alt={product.productName}
          className={cn(
            "object-cover w-full h-full transition-opacity duration-200",
            !product.imageUrls?.[0] && "hover:opacity-75"
          )}
          onError={(e) => {
            e.currentTarget.src = fallbackPlaceholder;
          }}
        />
        {!product.imageUrls?.[0] && (
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b",
            isDarkMode
              ? "from-gray-800/0 to-gray-800/60"
              : "from-gray-50/0 to-gray-50/60"
          )}>
            <ImageIcon className={cn(
              "w-10 h-10",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )} />
            <p className={cn(
              "text-sm font-medium mt-2",
              isDarkMode ? "text-gray-200" : "text-gray-600"
            )}>
              Image Not Available
            </p>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Link to={`/dashboard/customer/product/${product.productId}`}>
              <h3 className={cn(
                "font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>{product.productName}</h3>
            </Link>
            <p className={cn(
              "text-sm line-clamp-2",
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}>{product.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {renderRatingStars(4.5)}
              <span className={cn(
                "text-sm ml-1",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>({Math.floor(Math.random() * 100) + 10})</span>
            </div>
            <span className={cn(
              "text-sm px-2 py-1 rounded-full bg-opacity-10",
              isDarkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            )}>
              <Tag className="h-3.5 w-3.5 inline mr-1" />
              {product.category}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={cn(
                "text-lg font-bold",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>Rp {product.basePrice.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>Stock</p>
              <p className={cn(
                "font-medium",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>{getInventoryByProductId(product.productId)?.quantityOnHand || 0}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className={cn(
                "flex-1 transition-all duration-200",
                "bg-blue-600 text-white hover:bg-blue-700",
                "shadow-sm hover:shadow"
              )}
              onClick={() => onAddToCart(product.productId, product.productName)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Link to={`/dashboard/customer/product/${product.productId}`} className="flex-1">
              <Button
                variant="outline"
                className={cn(
                  "w-full transition-all duration-200",
                  isDarkMode
                    ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "border-gray-200 hover:bg-gray-100",
                  "shadow-sm hover:shadow"
                )}
              >
                Detail
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;