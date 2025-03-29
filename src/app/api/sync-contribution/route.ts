import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      month,
      year,
      totalExpense,
      canadianContribution,
    } = await req.json();

    if (!userId || !month || !year) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    await prisma.analytics.upsert({
      where: {
        userId_month_year: {
          userId,
          month,
          year,
        },
      },
      update: {
        totalExpense,
        canadianContribution,
        updatedAt: new Date(),
      },
      create: {
        userId,
        month,
        year,
        totalExpense,
        canadianContribution,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync contribution data' },
      { status: 500 },
    );
  }
}
