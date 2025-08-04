import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

interface ProductNotFoundProps {
  onBack: () => void;
}

const ProductNotFound: React.FC<ProductNotFoundProps> = ({ onBack }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className={cn(
          "text-2xl font-bold mb-4",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>
          Produk Tidak Ditemukan
        </h1>
        <p className={cn(
          "text-lg",
          isDarkMode ? "text-gray-300" : "text-gray-600"
        )}>
          Produk yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Button
          onClick={onBack}
          className="mt-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Beranda
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductNotFound; 