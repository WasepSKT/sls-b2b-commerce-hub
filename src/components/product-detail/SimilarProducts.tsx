import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { Product } from "@/lib/data/products";

interface SimilarProductsProps {
  similarProducts: Product[];
  onViewAll: () => void;
  onProductClick: (productId: string) => void;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  similarProducts,
  onViewAll,
  onProductClick
}) => {
  const { isDarkMode } = useTheme();

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className={cn(
          "text-2xl font-bold",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>
          Produk Serupa
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
        >
          Lihat Semua
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((similarProduct) => (
          <div
            key={similarProduct.productId}
            className={cn(
              "group cursor-pointer rounded-xl overflow-hidden border transition-all hover:shadow-lg",
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            )}
            onClick={() => onProductClick(similarProduct.productId)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={similarProduct.imageUrls?.[0] || '/placeholder.webp'}
                alt={similarProduct.productName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className={cn(
                "font-medium text-sm mb-2 line-clamp-2",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                {similarProduct.productName}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  Rp {similarProduct.basePrice.toLocaleString()}
                </span>
                <Badge variant="outline" className="text-xs">
                  {similarProduct.category}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts; 