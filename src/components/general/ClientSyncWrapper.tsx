'use client';

import { useContributionSync } from '@/hooks/useContributionSync';

export default function ClientSyncWrapper() {
  useContributionSync();
  return null;
}
