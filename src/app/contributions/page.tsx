import ContributionChart from '@/components/general/ContributionChart';
import Navbar from '@/components/general/Navbar';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { formatCurrency } from '@/lib/formatCurrency';
import { redirect } from 'next/navigation';

export default async function ContributionsPage() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/contributions');
  }

  const data = await prisma.analytics.findMany({
    where: { userId: session.user.id },
    orderBy: [{ year: 'asc' }, { month: 'asc' }],
    select: { month: true, year: true, canadianContribution: true },
  });

  const chartData = data.map((item: { month: any; year: any; canadianContribution: any }) => ({
    name: `${item.month}/${item.year}`,
    amount: item.canadianContribution,
  }));

  const total = data.reduce((sum: any, item: { canadianContribution: any }) => sum + item.canadianContribution, 0);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Your Contributions 🇨🇦</h1>
        <p className="text-muted-foreground mb-6">
          Total Lifetime Contribution:
          {' '}
          <strong>
            {formatCurrency(Number(total.toFixed(2)))}
          </strong>
        </p>
        <ContributionChart data={chartData} />
      </div>
    </>
  );
}
