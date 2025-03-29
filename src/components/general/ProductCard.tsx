import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { formatCurrency } from '@/lib/formatCurrency';
import CanadaLogo from '@/public/logos/canada.webp';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Product } from '../../../types/product';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <Card
      className="h-full flex flex-col pt-4 pb-0 group transition-all duration-300 hover:shadow-md cursor-pointer"

      onClick={() => onClick(product)}
    >
      <div className="relative min-h-48 overflow-hidden">
        <Image
          src={product.imageSrc}
          alt={product.title}
          fill
          className="object-contain transition-transform duration-300"
        />
        {product.isMadeInCanada && (
          <div className="absolute top-3 left-3 text-xs font-medium py-1 px-2 rounded-full flex items-center">
            <Image src={CanadaLogo} alt="canada logo" height={24} width={24} />
          </div>
        )}
      </div>

      <CardContent className="flex-grow px-4 pt-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="font-bold text-canada-blue">
          {formatCurrency(Number(product.price))}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2 flex-wrap">
        {product.amazonUrl && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 flex-1 border-gray-300 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              window.open(product.amazonUrl, '_blank');
            }}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            Amazon
          </Button>
        )}

        {product.walmartUrl && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 flex-1 border-gray-300 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              window.open(product.walmartUrl, '_blank');
            }}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            Walmart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
