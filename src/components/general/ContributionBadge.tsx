/* eslint-disable no-console */
'use client';
import { formatCurrency } from '@/lib/formatCurrency';

import { useContributionStore } from '@/store/useContributionStore';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ContributionModal } from './ContributionModal';

const ContributionBadge = () => {
  const { data: session, status } = useSession();
  const store = useContributionStore();
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  console.log('session', session);

  const handleClick = async () => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      signIn(); // Redirect to login
      return;
    }

    // Sync if needed
    // if (!store.synced && store.history.length > 0) {
    //   await fetch('/api/sync-analytics', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ history: store.history }),
    //   });
    //   store.markAsSynced();
    // }

    setOpen(true); // Open modal after sync or directly
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={handleClick}
              className="text-sm px-3 py-1 bg-muted hover:bg-muted/70 rounded-md"
            >
              🇨🇦
              <span className="ml-1">
                {formatCurrency(Number(store.totalContribution.toFixed(2)))}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={6}>
            <p>You’ve supported Canadian products!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ContributionModal open={open} onOpenChange={setOpen} />

    </>
  );
};

export default ContributionBadge;
