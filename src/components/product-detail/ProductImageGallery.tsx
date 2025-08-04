import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProductImages } from "@/hooks/useProductImages";

interface ProductImageGalleryProps {
  imageUrls: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  imageUrls,
  productName
}) => {
  const { isDarkMode } = useTheme();
  const { selectedImageIndex, nextImage, prevImage, setSelectedImageIndex } = useProductImages(imageUrls);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className="space-y-6">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 shadow-lg">
          <img
            src="/placeholder.webp"
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
        <img
          src={imageUrls[selectedImageIndex] || '/placeholder.webp'}
          alt={productName}
          className="w-full h-full object-cover"
        />

        {/* Navigation Buttons */}
        {imageUrls.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {imageUrls.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {imageUrls.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {imageUrls.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {imageUrls.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                "flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
                selectedImageIndex === index
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : isDarkMode ? "border-gray-600" : "border-gray-200"
              )}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery; 