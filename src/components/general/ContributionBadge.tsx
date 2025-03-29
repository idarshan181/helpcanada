'use client';

import { getUserTotalContribution } from '@/app/actions/contribution';
import { formatCurrency } from '@/lib/formatCurrency';
import { useContributionStore } from '@/store/useContributionStore';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export const InitGuestId = () => {
  const setGuestId = useContributionStore(state => state.setGuestId);

  useEffect(() => {
    const local = localStorage.getItem('guestId');
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('guestId='))
      ?.split('=')[1];

    const existing = local || cookie;

    if (!existing) {
      const newId = uuidv4();
      localStorage.setItem('guestId', newId);
      document.cookie = `guestId=${newId}; path=/; max-age=${60 * 60 * 24 * 365}`;
      setGuestId(newId);
    } else {
      setGuestId(existing);
    }
  }, [setGuestId]);

  return null;
};

const ContributionBadge = () => {
  const totalContribution = useContributionStore(state => state.totalContribution);
  const setTotalContribution = useContributionStore(state => state.setTotalContribution);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    const fetchContribution = async () => {
      const total = await getUserTotalContribution();
      setTotalContribution(total);
    };

    fetchContribution();
  }, [setTotalContribution]); // ✅ only depend on the setter function

  if (!hydrated) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="ghost"
            className="text-sm px-3 py-1 bg-muted hover:bg-muted/70 rounded-md"
            aria-label="View your Canadian product contributions"
          >
            <Link href="/contributions">
              🇨🇦
              <span className="ml-1">
                {formatCurrency(Number(totalContribution.toFixed(2)))}
              </span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={6}>
          <p>You’ve supported Canadian products!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ContributionBadge;
