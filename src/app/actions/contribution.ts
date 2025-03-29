// app/actions/contribution.ts
'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const getUserTotalContribution = async (): Promise<number> => {
  const session = await auth();

  if (!session?.user?.id) {
    return 0;
  }

  const total = await prisma.analytics.aggregate({
    _sum: {
      canadianContribution: true, // ✅ correct field
    },
    where: {
      userId: session.user.id,
    },
  });

  return total._sum.canadianContribution || 0;
};
