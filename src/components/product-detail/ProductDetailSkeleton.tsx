import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

const ProductDetailSkeleton = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      {/* Header Skeleton */}
      <div className={cn(
        "sticky top-0 z-50 border-b",
        isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="h-8 w-64 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="h-8 w-16 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-6">
            <div className="aspect-square rounded-xl bg-gray-300 animate-pulse"></div>
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-24 h-24 rounded-lg bg-gray-300 animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
              <div className="flex items-center space-x-6">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="h-24 bg-gray-300 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mt-16">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton; 