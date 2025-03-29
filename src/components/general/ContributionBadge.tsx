'use client';
import { formatCurrency } from '@/lib/formatCurrency';

import { useContributionStore } from '@/store/useContributionStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const ContributionBadge = () => {
  const store = useContributionStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant="ghost"
              className="text-sm px-3 py-1 bg-muted hover:bg-muted/70 rounded-md"
            >
              <Link href="/contributions">
                🇨🇦
                <span className="ml-1">
                  {formatCurrency(Number(store.totalContribution.toFixed(2)))}
                </span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={6}>
            <p>You’ve supported Canadian products!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </>
  );
};

export default ContributionBadge;
