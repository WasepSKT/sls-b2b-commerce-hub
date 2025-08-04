import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/data/products";
import { useTheme } from "@/lib/store/theme";
import { Share2, ExternalLink } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  getAgentForProduct: (productId: string) => { commission: number; name: string };
  getInventoryByProductId: (productId: string) => { quantityOnHand: number } | undefined;
  handleShareProduct: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  getAgentForProduct,
  getInventoryByProductId,
  handleShareProduct,
}) => {
  const { isDarkMode } = useTheme();
  const agent = getAgentForProduct(product.productId);
  const inventory = getInventoryByProductId(product.productId);

  return (
    <DialogContent className={cn(
      "max-w-2xl",
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    )}>
      <DialogHeader>
        <DialogTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
          Detail Produk
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.imageUrls?.[0] || '/placeholder.webp'}
              alt={product.productName}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className={cn(
                "text-xl font-semibold mb-2",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                {product.productName}
              </h3>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                {product.description || 'Tidak ada deskripsi'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                  Harga:
                </span>
                <span className={cn("font-semibold", isDarkMode ? "text-white" : "text-gray-900")}>
                  Rp {typeof product.basePrice === 'number' ? product.basePrice.toLocaleString() : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                  Komisi:
                </span>
                <span className={cn("font-semibold text-green-600", isDarkMode ? "text-green-400" : "")}>
                  {agent.commission}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                  Agent:
                </span>
                <span className={cn("font-semibold", isDarkMode ? "text-white" : "text-gray-900")}>
                  {agent.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                  Stok:
                </span>
                <span className={cn("font-semibold", isDarkMode ? "text-white" : "text-gray-900")}>
                  {inventory?.quantityOnHand ?? '-'} unit
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => handleShareProduct(product)}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan Link Produk
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(`/product/${product.productId}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Lihat Halaman Produk
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ProductDetail;