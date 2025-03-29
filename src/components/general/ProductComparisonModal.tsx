import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/data/products';
import CanadaLogo from '@/public/logos/canada.webp';
import { ArrowLeft, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

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

  useEffect(() => {
    // Load saved comparisons from localStorage
    const saved = localStorage.getItem('savedComparisons');
    if (saved) {
      setSavedComparisons(JSON.parse(saved));
    }
  }, []);

  const handleAddToCart = (productToAdd: Product) => {
    toast.success(`Added ${productToAdd.title} to cart`);
  };

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
          <Card className="flex flex-col pt-0 h-full">
            <CardHeader className="relative pt-[75%] overflow-hidden rounded-md mb-4">
              <img
                src={product.imageSrc}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {product.isMadeInCanada && (
                <div className="absolute top-3 left-3 text-xs font-medium py-1 px-2 rounded-full flex items-center">
                  <Image src={CanadaLogo} alt="canada logo" height={24} width={24} />
                </div>
              )}
            </CardHeader>

            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>

              <div className="mt-2 mb-4">
                <h4 className="font-semibold text-sm mb-1">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>
                    Price:
                    <span className="font-bold text-canada-blue">
                      $
                      {product.price.toFixed(2)}
                    </span>
                  </li>
                  <li>
                    {product.isMadeInCanada ? 'Made in Canada' : 'Imported'}
                  </li>
                  <li>
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="mt-auto flex gap-2">
              <Button
                className="flex-1"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </CardFooter>

          </Card>

          {/* Second Product */}
          {secondProduct && (
            <Card className="flex flex-col h-full pt-0">
              <CardHeader className="relative pt-[75%] overflow-hidden rounded-md mb-4">
                <Image
                  src={secondProduct.imageSrc}
                  alt={secondProduct.title}
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {secondProduct.isMadeInCanada && (
                  <div className="absolute top-3 left-3 text-xs font-medium py-1 px-2 rounded-full flex items-center">
                    <Image src={CanadaLogo} alt="canada logo" height={24} width={24} />
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2">{secondProduct.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{secondProduct.description}</p>

                <div className="mt-2 mb-4">
                  <h4 className="font-semibold text-sm mb-1">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                    <li>
                      Price:
                      <span className="font-bold">
                        $
                        {secondProduct.price.toFixed(2)}
                      </span>
                    </li>
                    <li>
                      {secondProduct.isMadeInCanada ? 'Made in Canada' : 'Imported'}
                    </li>
                    <li>
                      {secondProduct.category.charAt(0).toUpperCase() + secondProduct.category.slice(1)}
                    </li>
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="mt-auto flex gap-2">
                <Button
                  className="flex-1 "
                  onClick={() => handleAddToCart(secondProduct)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          )}
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
