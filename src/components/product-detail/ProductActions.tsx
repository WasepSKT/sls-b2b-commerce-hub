import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Product, Inventory } from "@/lib/data/products";

interface ProductActionsProps {
  product: Product;
  inventory: Inventory | undefined;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  inventory,
  onAddToCart,
  onBuyNow
}) => {
  const { isDarkMode } = useTheme();
  const [quantity, setQuantity] = useState(1);

  const maxQuantity = inventory?.quantityOnHand || 0;

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="h-10 w-10"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className={cn(
            "px-6 py-2 text-lg font-medium min-w-[60px] text-center",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="h-10 w-10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <span className={cn(
          "text-sm",
          isDarkMode ? "text-gray-400" : "text-gray-600"
        )}>
          Tersedia: {maxQuantity}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          size="lg"
          className="w-full h-12 text-base"
          onClick={onAddToCart}
          disabled={maxQuantity === 0}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Tambah ke Keranjang
        </Button>
        <Button
          size="lg"
          className="w-full h-12 text-base"
          onClick={onBuyNow}
          disabled={maxQuantity === 0}
        >
          Beli Sekarang
        </Button>
      </div>

      {/* Guarantee Info */}
      <div className={cn(
        "p-6 rounded-xl",
        isDarkMode ? "bg-gray-800" : "bg-gray-50"
      )}>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-5 h-5 mr-3 text-green-500">🛡️</div>
            <div>
              <div className={cn(
                "font-medium",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Garansi 100%
              </div>
              <div className={cn(
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Original
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 mr-3 text-blue-500">🚚</div>
            <div>
              <div className={cn(
                "font-medium",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Pengiriman Cepat
              </div>
              <div className={cn(
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                1-3 hari
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductActions; 