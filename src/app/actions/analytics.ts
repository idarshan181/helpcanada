'use server';

import { prisma } from '@/lib/db';

export async function updateMonthlyContribution(userId: string, amount: number) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  try {
    await prisma.analytics.upsert({
      where: {
        userId_month_year: {
          userId,
          month,
          year,
        },
      },
      update: {
        totalExpense: {
          increment: amount,
        },
        canadianContribution: {
          increment: amount,
        },
        updatedAt: new Date(),
      },
      create: {
        userId,
        month,
        year,
        totalExpense: amount,
        canadianContribution: amount,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return { success: true };
  } catch (err) {
    console.error('❌ Failed to update analytics:', err);
    return { success: false, error: 'DB update failed' };
  }
}
