import { useState } from 'react';

interface UseProductImagesReturn {
  selectedImageIndex: number;
  nextImage: () => void;
  prevImage: () => void;
  setSelectedImageIndex: (index: number) => void;
}

export const useProductImages = (imageUrls: string[] = []): UseProductImagesReturn => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === (imageUrls.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? (imageUrls.length || 1) - 1 : prev - 1
    );
  };

  return {
    selectedImageIndex,
    nextImage,
    prevImage,
    setSelectedImageIndex
  };
}; 