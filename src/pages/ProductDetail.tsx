import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

interface ProductImage {
  url: string;
  alt: string;
}

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();

  // Mock data - replace with actual API data
  const product = {
    id: 1,
    name: "Premium Product",
    price: 1500000,
    discount: 10,
    stock: 50,
    description: "High-quality premium product with excellent features and durability.",
    specifications: [
      { label: "Brand", value: "Premium Brand" },
      { label: "Material", value: "High-grade material" },
      { label: "Weight", value: "1.5 kg" },
      { label: "Dimensions", value: "30 x 20 x 10 cm" },
    ],
    images: [
      { url: "/product-1.jpg", alt: "Product view 1" },
      { url: "/product-2.jpg", alt: "Product view 2" },
      { url: "/product-3.jpg", alt: "Product view 3" },
    ] as ProductImage[],
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    toast({
      title: "Added to Cart",
      description: `${quantity} ${product.name} has been added to your cart`,
    });
  };

  const handleBuyNow = () => {
    // Redirect to checkout with this product
    // Implementation will be added later
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage].url}
              alt={product.images[selectedImage].alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-square overflow-hidden rounded-lg border cursor-pointer
                  ${selectedImage === index ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary">
                  Rp {calculateDiscountedPrice(product.price, product.discount).toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      Rp {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-red-500 font-semibold">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500">Stock: {product.stock} units</p>
            </div>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700">{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{spec.label}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label>Quantity:</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <Input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                className="flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 