import { useState, useEffect } from 'react';
import { 
  getProductById, 
  getInventoryByProductId, 
  getReviewsByProductId, 
  getAverageRatingByProductId, 
  getReviewCountByProductId, 
  getSimilarProducts 
} from '@/lib/data/products';
import { Product, Inventory, Review } from '@/lib/data/products';

interface UseProductDetailReturn {
  product: Product | null;
  inventory: Inventory | undefined;
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  similarProducts: Product[];
  loading: boolean;
  error: string | null;
}

export const useProductDetail = (productId: string | undefined): UseProductDetailReturn => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [inventory, setInventory] = useState<Inventory | undefined>(undefined);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!productId) {
      setError('Product ID is required');
      setLoading(false);
      return;
    }

    try {
      const productData = getProductById(productId);
      if (!productData) {
        setError('Product not found');
        setLoading(false);
        return;
      }

      setProduct(productData);
      setInventory(getInventoryByProductId(productId));
      setReviews(getReviewsByProductId(productId));
      setAverageRating(getAverageRatingByProductId(productId));
      setReviewCount(getReviewCountByProductId(productId));
      setSimilarProducts(getSimilarProducts(productId, 4));
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
      setLoading(false);
    }
  }, [productId]);

  return {
    product,
    inventory,
    reviews,
    averageRating,
    reviewCount,
    similarProducts,
    loading,
    error
  };
}; 