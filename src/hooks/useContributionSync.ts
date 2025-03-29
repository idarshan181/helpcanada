/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useContributionStore } from '@/store/useContributionStore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function useContributionSync() {
  const {
    current,
    totalContribution,
    synced,
    setGuestId,
    markAsSynced,
  } = useContributionStore();

  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (status !== 'authenticated' || !userId || synced) {
      return;
    }

    setGuestId(userId);

    const now = new Date();
    const month = now.getMonth() + 1; // JS months are 0-indexed
    const year = now.getFullYear();

    const syncContributions = async () => {
      try {
        const res = await fetch('/api/sync-contribution', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            month,
            year,
            totalExpense: current, // 👈 match your schema
            canadianContribution: totalContribution, // 👈 match your schema
          }),
        });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        markAsSynced();
      } catch (err) {
        console.error('❌ Failed to sync contributions:', err);
      }
    };

    syncContributions();
  }, [userId, status, synced]);
}
