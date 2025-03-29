'use client';

import { Button } from '@/components/ui/button';

import { useContributionStore } from '@/store/useContributionStore';
import confetti from 'canvas-confetti';
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

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }

    setTimeout(() => {
      window.open(url, '_blank');
    }, 1500); // 1.5 seconds
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
