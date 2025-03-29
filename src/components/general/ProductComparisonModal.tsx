import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Product } from '../../../types/product';
import ProductComparisonCard from './ProductComparisonCard';

interface ProductComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  alternativeProduct: Product | null;
  recommendedProducts: Product[];
  onSwitchProduct: (product: Product) => void;
}

const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  isOpen,
  onClose,
  product,
  alternativeProduct,
  recommendedProducts,
  onSwitchProduct,
}) => {
  const [savedComparisons, setSavedComparisons] = useState<string[]>([]);

  const [_hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    // Load saved comparisons from localStorage
    const saved = localStorage.getItem('savedComparisons');
    if (saved) {
      setSavedComparisons(JSON.parse(saved));
    }
  }, []);

  const handleSaveComparison = () => {
    if (!product) {
      return;
    }

    const comparisonKey = alternativeProduct
      ? `${product.id}-${alternativeProduct.id}`
      : `${product.id}-${recommendedProducts[0]?.id}`;

    if (!savedComparisons.includes(comparisonKey)) {
      const newSavedComparisons = [...savedComparisons, comparisonKey];
      setSavedComparisons(newSavedComparisons);
      localStorage.setItem('savedComparisons', JSON.stringify(newSavedComparisons));
      toast.success('Comparison saved for later');
    } else {
      toast.info('This comparison is already saved');
    }
  };

  if (!product) {
    return null;
  }

  // Either show comparison with alternative product, or recommendation
  const secondProduct = alternativeProduct || recommendedProducts[0] || null;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="md:max-w-2xl p-0 overflow-auto max-h-[90vh]">
        <DialogHeader className="p-6 pb-0 flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-xl md:text-2xl mb-2">
              {alternativeProduct ? 'Product Comparison' : 'You might also like'}
            </DialogTitle>
            <DialogDescription>
              {alternativeProduct
                ? 'Compare these products to find the best option for you'
                : 'Based on your selection, you might be interested in this similar product'}
            </DialogDescription>
          </div>

        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          {/* First Product */}
          <ProductComparisonCard product={product} />

          {/* Second Product */}
          {secondProduct && <ProductComparisonCard product={secondProduct} />}
        </div>

        {/* Switch and Save Controls */}
        <div className="p-6 py-2 flex flex-col sm:flex-row justify-between gap-4 border-t">
          <div className="flex flex-row gap-2 mx-auto sm:mx-0">
            {recommendedProducts.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentIndex = recommendedProducts.findIndex(p => p.id === secondProduct?.id);
                    const prevIndex = (currentIndex - 1 + recommendedProducts.length) % recommendedProducts.length;
                    onSwitchProduct(recommendedProducts[prevIndex]);
                  }}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentIndex = recommendedProducts.findIndex(p => p.id === secondProduct?.id);
                    const nextIndex = (currentIndex + 1) % recommendedProducts.length;
                    onSwitchProduct(recommendedProducts[nextIndex]);
                  }}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveComparison}
          >
            <Heart className="h-4 w-4 mr-1" />
            Save Comparison
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductComparisonModal;
