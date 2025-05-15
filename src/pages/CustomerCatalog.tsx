import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ShoppingCart } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/lib/store/products";
import { useCart } from "@/lib/store/cart";

const CustomerCatalog = () => {
  const { toast } = useToast();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    getFilteredProducts,
  } = useProducts();

  const { addToCart } = useCart();

  const products = getFilteredProducts();
  const categories = ["Electronics", "Fashion", "Home", "Sports", "Beauty"];

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(productId, 1);
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart`,
    });
  };

  return (
    <DashboardLayout role="customer" pageTitle="Product Catalog">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Filters */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <Slider
                min={0}
                max={5000000}
                step={100000}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mt-2"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Rp {priceRange[0].toLocaleString()}</span>
                <span>Rp {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Products</h1>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <div className="mt-2">
                        <div className="text-lg font-bold text-primary">
                          Rp {(product.price * (1 - product.discount / 100)).toLocaleString()}
                        </div>
                        {product.discount > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 line-through">
                              Rp {product.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-red-500 font-semibold">
                              -{product.discount}%
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleAddToCart(product.id, product.name)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerCatalog;
