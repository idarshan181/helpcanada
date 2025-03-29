'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatCurrency';
import CanadaLogo from '@/public/logos/canada.webp';
import Image from 'next/image';
import { Product } from '../../../types/product';
import { StoreButton } from './StoreButton';

interface ProductComparisonCardProps {
  product: Product;
}

const ProductComparisonCard: React.FC<ProductComparisonCardProps> = ({ product }) => {
  return (
    <Card className="flex flex-col pt-6 pb-2 h-full">
      <CardHeader className="relative pt-[75%] overflow-hidden rounded-md mb-4">
        <Image
          src={product.imageSrc}
          alt={product.title}
          fill
          className="object-contain"
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
              {' '}
              <span className="font-bold text-canada-blue">
                {formatCurrency(Number(product.price.toFixed(2)))}
              </span>
            </li>
            <li>{product.isMadeInCanada ? 'Made in Canada' : 'Imported'}</li>
          </ul>
        </div>
      </CardContent>

      {(product.amazonUrl || product.walmartUrl) && (
        <CardFooter className="mt-auto flex gap-2">
          {product.amazonUrl && (
            <StoreButton product={product} store="Amazon" url={product.amazonUrl} />
          )}
          {product.walmartUrl && (
            <StoreButton product={product} store="Walmart" url={product.walmartUrl} />
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductComparisonCard;
