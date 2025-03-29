// import { auth } from '@/lib/auth';
// import { prisma } from '@/lib/db';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const session = await auth();

//   if (!session || !session.user?.email) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const { history } = await req.json();

//   try {
//     await Promise.all(
//       history.map(async ({ month, year, amount }: any) => {
//         await prisma.analytics.upsert({
//           where: {
//             userId_month_year: {
//               userId: session.user.id,
//               month,
//               year,
//             },
//           },
//           update: {
//             canadianContribution: { increment: amount },
//           },
//           create: {
//             userId: session.user.id,
//             month,
//             year,
//             canadianContribution: amount,
//             totalExpense: 0,
//           },
//         });
//       }),
//     );

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Sync error:', error);
//     return NextResponse.json({ error: 'Failed to sync contributions' }, { status: 500 });
//   }
// }
