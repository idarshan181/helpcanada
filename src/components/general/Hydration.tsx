'use client';

import { useContributionStore } from '@/store/useContributionStore';
import * as React from 'react';

const Hydration = () => {
  React.useEffect(() => {
    useContributionStore.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;
