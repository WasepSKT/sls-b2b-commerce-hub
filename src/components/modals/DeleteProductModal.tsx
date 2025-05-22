import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteProduct: (productId: number) => void;
  product: any;
}

const DeleteProductModal = ({ 
  isOpen, 
  onClose, 
  onDeleteProduct, 
  product 
}: DeleteProductModalProps) => {
  const { isDarkMode } = useTheme();

  const handleDelete = () => {
    if (product) {
      onDeleteProduct(product.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "sm:max-w-[425px]",
        isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
      )}>
        <DialogHeader>
          <DialogTitle className={cn(
            "flex items-center gap-2",
            isDarkMode ? "text-gray-100" : ""
          )}>
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Konfirmasi Hapus Produk
          </DialogTitle>
          <DialogDescription className={cn(
            isDarkMode ? "text-gray-400" : ""
          )}>
            Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        {product && (
          <div className={cn(
            "border rounded-md p-4 my-2",
            isDarkMode ? "bg-gray-750 border-gray-700" : "bg-gray-50 border-gray-200"
          )}>
            <p className={cn(
              "font-medium mb-1",
              isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>{product.name}</p>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>SKU: {product.sku}</p>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>Harga: {product.price}</p>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>Stok: {product.stock}</p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="outline"
            onClick={onClose}
            className={cn(
              isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
            )}
          >
            Batal
          </Button>
          <Button 
            variant="destructive"
            onClick={handleDelete}
            className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-red-600 text-white hover:bg-red-700" 
                : "bg-red-600 text-white hover:bg-red-700"
            )}
          >
            <Trash className="mr-2 h-4 w-4" />
            Hapus Produk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductModal; 