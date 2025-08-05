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
  onBuy?: (productId: string, productName: string) => void;
  renderRatingStars: (rating: number) => JSX.Element[];
  onCardClick?: () => void;
  hideDetailButton?: boolean;
}

const ProductCard = ({ product, onAddToCart, onBuy, renderRatingStars, onCardClick, hideDetailButton }: ProductCardProps) => {
  const { isDarkMode } = useTheme();

  const getPlaceholderImage = (width = 400, height = 300) => {
    const bgColor = isDarkMode ? '374151' : 'F3F4F6';
    const textColor = isDarkMode ? 'D1D5DB' : '6B7280';
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=Product+Image`;
  };

  const fallbackPlaceholder = "https://placehold.co/400x300/gray/white?text=Product+Image";

  return (
    <Card key={product.productId} className={cn(
      "overflow-hidden transition-all duration-300 group cursor-pointer",
      isDarkMode
        ? "bg-gray-800 border-gray-700 hover:border-gray-600"
        : "bg-white border-gray-200 hover:border-gray-300"
    )}
      onClick={onCardClick}
    >
      <div
        className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-700 w-full group-hover:opacity-100"
        onClick={onCardClick}
        style={{ cursor: onCardClick ? 'pointer' : undefined }}
      >
        <img
          src={product.imageUrls?.[0] || getPlaceholderImage()}
          alt={product.productName}
          className={cn(
            "object-cover w-full h-full transition-opacity duration-200 hover:opacity-90"
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
        <span className={cn(
          "absolute top-2 right-2 px-2 py-1 rounded-full text-sm font-medium hidden group-hover:block",
          isDarkMode
            ? "bg-white text-black bg-opacity-90"
            : "bg-white text-black bg-opacity-90"
        )}>
          <Tag className="h-3.5 w-3.5 inline mr-1" />
          {product.category}
        </span>
      </div>
      <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
        <div className="flex-1 space-y-3">
          <h3 className={cn(
            "font-medium text-base sm:text-lg group-hover:text-blue-600 transition-colors line-clamp-1",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>{product.productName}</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Star className={cn(
                "h-4 w-4 fill-current",
                "text-yellow-400"
              )} />
              <span className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>4.8 / 5.0</span>
            </span>
            <span className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}>
              {product.sold} Terjual
            </span>
          </div>
          <p className={cn(
            "text-base sm:text-lg font-bold",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>Rp {product.basePrice.toLocaleString()}</p>
        </div>
        <div className="flex gap-2 mt-3">
          <Button
            className={cn(
              "flex-1 transition-all duration-200 flex items-center justify-center h-9",
              "bg-blue-600 text-white hover:bg-blue-700",
              "shadow-sm hover:shadow"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.productId, product.productName);
            }}
            title="Tambah ke Keranjang"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button
            className={cn(
              "flex-1 transition-all duration-200 h-9",
              "bg-green-600 text-white hover:bg-green-700",
              "shadow-sm hover:shadow"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (typeof onBuy === 'function') {
                onBuy(product.productId, product.productName);
              }
            }}
          >
            Beli
          </Button>
          {!hideDetailButton && (
            <Button
              variant="outline"
              className={cn(
                "w-full transition-all duration-200 h-9",
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "border-gray-200 hover:bg-gray-100",
                "shadow-sm hover:shadow"
              )}
              onClick={onCardClick}
            >
              Detail
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;