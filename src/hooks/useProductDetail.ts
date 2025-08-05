import { useState, useEffect } from 'react';
import { 
  getProductById, 
  getInventoryByProductId, 
  getReviewsByProductId,
  getAverageRatingByProductId,
  getReviewCountByProductId,
  getSimilarProducts,
  Product,
  Inventory,
  Review
} from '@/lib/data/products';

interface ProductState {
  product: Product | null;
  inventory: Inventory | undefined;
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  similarProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  inventory: undefined,
  reviews: [],
  averageRating: 0,
  reviewCount: 0,
  similarProducts: [],
  loading: true,
  error: null
};

function stripRolePrefix(productId: string): string {
  return productId.replace(/^(dist-|agent-|reseller-|customer-)/, '');
}

export function useProductDetail(productId: string | undefined): ProductState {
  const [state, setState] = useState<ProductState>(initialState);

  useEffect(() => {
    let isSubscribed = true;

    async function loadProductData(): Promise<void> {
      if (!productId) {
        setState(prev => ({ ...prev, error: 'Product ID is required', loading: false }));
        return;
      }

      try {
        const product = getProductById(productId);
        
        if (!product) {
          setState(prev => ({
            ...prev,
            error: 'Product not found',
            product: null,
            loading: false
          }));
          return;
        }

        const baseId = stripRolePrefix(productId);

        const [inventory, reviews, averageRating, reviewCount, similarProducts] = await Promise.all([
          getInventoryByProductId(baseId),
          getReviewsByProductId(baseId),
          getAverageRatingByProductId(baseId),
          getReviewCountByProductId(baseId),
          getSimilarProducts(baseId)
        ]);

        if (isSubscribed) {
          setState({
            product,
            inventory,
            reviews,
            averageRating,
            reviewCount,
            similarProducts,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        if (isSubscribed) {
          console.error('Error loading product:', error);
          setState(prev => ({
            ...prev,
            error: error instanceof Error ? error.message : 'Failed to load product',
            product: null,
            loading: false
          }));
        }
      }
    }

    void loadProductData();

    return () => {
      isSubscribed = false;
    };
  }, [productId]);

  return state;
}
