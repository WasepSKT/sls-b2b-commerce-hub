import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { ArrowLeft, Search, Share2, Heart, User } from "lucide-react";

interface ProductHeaderProps {
  onBack: () => void;
  onShare: () => void;
  onWishlist: () => void;
  onLogin: () => void;
  isWishlisted: boolean;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  onBack,
  onShare,
  onWishlist,
  onLogin,
  isWishlisted
}) => {
  const { isDarkMode } = useTheme();

  return (
    <header className={cn(
      "sticky top-0 z-50 border-b",
      isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="hidden sm:flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk..."
                className={cn(
                  "bg-transparent border-none outline-none text-sm w-64",
                  isDarkMode ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
                )}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className={cn(
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onWishlist}
              className={cn(
                isWishlisted ? "text-red-500" : isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogin}
              className={cn(
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader; 