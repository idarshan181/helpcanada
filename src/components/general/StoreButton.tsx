'use client';

import { Button } from '@/components/ui/button';

import { useContributionStore } from '@/store/useContributionStore';
import { toast } from 'sonner';
import { Product } from '../../../types/product';

interface StoreButtonProps {
  product: Product;
  store: 'Amazon' | 'Walmart';
  url: string;
}

export const StoreButton: React.FC<StoreButtonProps> = ({ product, store, url }) => {
  const { addContribution } = useContributionStore();

  const handleStoreClick = (product: Product, url: string, store: 'Amazon' | 'Walmart') => {
    if (!url) {
      toast.error(`No ${store} link available`);
      return;
    }

    if (product.isMadeInCanada) {
      addContribution(product.price);
      toast.success(`$${product.price.toFixed(2)} contributed toward Canadian-made products 🇨🇦`);
    }

    window.open(url, '_blank');
  };

  return (
    <Button
      variant="outline"
      className="flex-1"
      onClick={() => handleStoreClick(product, url, store)}
    >
      {store}
    </Button>
  );
};
