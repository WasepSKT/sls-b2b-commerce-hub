import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { Product } from "@/lib/data/products";
import ProductCard from "@/components/business/ProductCard";

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
          <ProductCard
            key={similarProduct.productId}
            product={similarProduct}
            onAddToCart={() => { }}
            onBuy={() => onProductClick(similarProduct.productId)}
            renderRatingStars={(rating) => {
              return [...Array(5)].map((_, i) => (
                <span key={i}>
                  <svg
                    className={cn(
                      "h-4 w-4 inline",
                      i < Math.floor(rating)
                        ? "text-yellow-400 fill-current"
                        : isDarkMode ? "text-gray-600" : "text-gray-300"
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <polygon points="9.9,1.1 7.6,6.6 1.6,7.6 6,11.9 4.9,17.9 9.9,14.9 14.9,17.9 13.8,11.9 18.2,7.6 12.2,6.6 " />
                  </svg>
                </span>
              ));
            }}
            onCardClick={() => onProductClick(similarProduct.productId)}
            hideDetailButton
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts; 