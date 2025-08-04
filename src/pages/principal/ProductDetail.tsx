import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { Badge } from "@/components/ui";
import { ArrowLeft, Edit, Trash, Package } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { useToast } from "@/hooks/use-toast";
import EditProductModal from "@/components/modals/EditProductModal";
import DeleteProductModal from "@/components/modals/DeleteProductModal";
import { principalProducts as allProducts, Product } from "@/lib/data/products";

// This would come from an API in a real application
const getProductData = (productId: string): Product | undefined => {
  // Find the product matching the ID
  const foundProduct = allProducts.find(product => product.product_id === productId);
  console.log(`Looking for product ID: ${productId}, Found:`, foundProduct); // Debug log
  return foundProduct;
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "Elektronik",
    "Fashion",
    "Kesehatan",
    "Rumah Tangga",
    "Makanan & Minuman",
    "Otomotif",
    "Olahraga",
    "Lainnya"
  ];

  useEffect(() => {
    // Debug the current productId from URL params
    console.log("Current productId from URL:", productId, typeof productId);
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (!productId) {
        setError("Produk ID tidak ditemukan dalam URL");
        setIsLoading(false);
        return;
      }
      
      const productData = getProductData(productId);
      if (productData) {
        setProduct(productData);
        setIsLoading(false);
      } else {
        setError(`Produk dengan ID ${productId} tidak ditemukan`);
        toast({
          variant: "destructive",
          title: "Error",
          description: `Produk dengan ID ${productId} tidak ditemukan`,
        });
        // Wait a bit before redirecting to show the error
        setTimeout(() => navigate("/dashboard/principal/products"), 1500);
        setIsLoading(false);
      }
    } catch (err) {
      setError(`Terjadi kesalahan: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsLoading(false);
      console.error("Error fetching product:", err);
    }
  }, [productId, navigate, toast]);

  const handleEditProduct = (updatedProduct: any, file: File | null) => {
    // In a real app, this would make an API call to update the product
    toast({
      title: "Produk diperbarui",
      description: `Produk ${updatedProduct.product_name} berhasil diperbarui`,
    });
    
    // Update local state
    setProduct({
      ...product,
      ...updatedProduct,
      base_price: parseInt(updatedProduct.base_price)
    } as Product);
    setIsEditModalOpen(false);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would make an API call to delete the product
    toast({
      title: "Produk dihapus",
      description: `Produk #${productId} telah dihapus`,
    });
    
    // Navigate back to products list
    navigate("/dashboard/principal/products");
  };

  if (isLoading) {
    return (
      <DashboardLayout role="principal" pageTitle="Detail Produk">
        <div className="flex items-center justify-center h-64">
          <p className={cn(
            "text-lg",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>Memuat data produk...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="principal" pageTitle="Detail Produk">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className={cn(
            "text-lg text-red-500 font-medium"
          )}>{error}</p>
          <Button 
            variant="default" 
            onClick={() => navigate("/dashboard/principal/products")}
          >
            Kembali ke Daftar Produk
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  if (!product) {
    return (
      <DashboardLayout role="principal" pageTitle="Detail Produk">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className={cn(
            "text-lg",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>Produk tidak ditemukan</p>
          <Button 
            variant="default" 
            onClick={() => navigate("/dashboard/principal/products")}
          >
            Kembali ke Daftar Produk
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="principal" pageTitle="Detail Produk">
      <div className="space-y-6">
        {/* Edit Product Modal */}
        <EditProductModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEditProduct={handleEditProduct}
          categories={categories}
          currentProduct={product}
        />

        {/* Delete Confirmation Modal */}
        <DeleteProductModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteProduct={() => handleDeleteProduct(product.product_id)}
          product={product}
        />

        {/* Header and Nav */}
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/dashboard/principal/products")}
              className={cn(
                isDarkMode ? "text-gray-300 border-gray-600" : ""
              )}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali
            </Button>
            <h1 className={cn(
              "text-2xl font-bold",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              {product.product_name}
            </h1>
            <Badge
              className={cn(
                product.is_active
                  ? isDarkMode 
                    ? "bg-green-500/20 text-green-400"
                    : "bg-green-100 text-green-800"
                  : isDarkMode
                    ? "bg-red-500/20 text-red-400"
                    : "bg-red-100 text-red-800"
              )}
            >
              {product.is_active ? 'Active' : 'Out of Stock'}
            </Badge>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className={cn(
                isDarkMode ? "text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white" : ""
              )}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit Produk
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash className="h-4 w-4 mr-1" />
              Hapus Produk
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product Image */}
          <Card className={cn(
            "col-span-1",
            isDarkMode ? "bg-gray-800 border-gray-700" : ""
          )}>
            <CardContent className="p-4">
              <div className="aspect-square relative overflow-hidden rounded-md">
                <img
                  src={product.image_urls[0] || "https://placehold.co/600x600/222222/FFFFFF/png?text=No+Image"}
                  alt={product.product_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Info */}
          <Card className={cn(
            "col-span-1 md:col-span-2",
            isDarkMode ? "bg-gray-800 border-gray-700" : ""
          )}>
            <CardHeader className={cn(
              "pb-2",
              isDarkMode ? "border-gray-700" : "border-gray-200"
            )}>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Informasi Produk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="overview" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className={cn(
                  "w-full justify-start mb-4",
                  isDarkMode ? "bg-gray-700" : ""
                )}>
                  <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                  <TabsTrigger value="details">Detail</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>SKU</p>
                      <p className={cn(
                        "text-base",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{product.SKU}</p>
                    </div>
                    <div className="space-y-1">
                      <p className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>Kategori</p>
                      <p className={cn(
                        "text-base",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{product.category}</p>
                    </div>
                    <div className="space-y-1">
                      <p className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>Harga</p>
                      <p className={cn(
                        "text-xl font-semibold",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{`Rp ${product.base_price.toLocaleString()}`}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className={cn(
                      "text-lg font-medium",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>Deskripsi</h3>
                    <p className={cn(
                      "text-base",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>{product.description}</p>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="mt-0 space-y-4">
                  <h3 className={cn(
                    "text-lg font-medium",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>Spesifikasi Produk</h3>
                  <div className={cn(
                    "rounded-md p-4 whitespace-pre-line",
                    isDarkMode ? "bg-gray-750 text-gray-300" : "bg-gray-50 text-gray-700"
                  )}>
                    {`Berat: ${product.weight_grams} gram\nDimensi: ${product.dimensions_cm.width} x ${product.dimensions_cm.height} x ${product.dimensions_cm.depth} cm`}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductDetail;