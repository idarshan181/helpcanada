import ContributionChart from '@/components/general/ContributionChart';
import Navbar from '@/components/general/Navbar';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { formatCurrency } from '@/lib/formatCurrency';
import { redirect } from 'next/navigation';

const getMonthLabel = (month: number, year: number) =>
  `${new Date(year, month - 1).toLocaleString('default', { month: 'short' })} ${year}`;

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

  // If no data at all
  if (!data || data.length === 0) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Your Contributions 🇨🇦</h1>
          <p className="text-muted-foreground mb-6">
            Total Lifetime Contribution:
            {' '}
            <strong>$0.00</strong>
          </p>
          <ContributionChart data={[]} />
        </div>
      </>
    );
  }

  // Determine range of months
  const startYear = data[0].year;
  const startMonth = data[0].month;
  const endDate = new Date();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth() + 1;

  // Create a full list of months from start to now
  const fullMonthList = [];
  let y = startYear;
  let m = startMonth;
  while (y < endYear || (y === endYear && m <= endMonth)) {
    fullMonthList.push({ year: y, month: m });
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }

  const dataMap = new Map(
    data.map(d => [`${d.month}-${d.year}`, d.canadianContribution]),
  );

  const chartData = fullMonthList.map(({ month, year }) => ({
    name: getMonthLabel(month, year),
    amount: dataMap.get(`${month}-${year}`) ?? 0,
  }));

  const total = chartData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Your Contributions 🇨🇦</h1>
        <p className="text-muted-foreground mb-6">
          Total Lifetime Contribution:
          {' '}
          <strong>{formatCurrency(Number(total.toFixed(2)))}</strong>
        </p>
        <ContributionChart data={chartData} />
      </div>
    </>
  );
}
