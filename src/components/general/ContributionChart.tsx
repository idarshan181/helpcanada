'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer } from '../ui/chart';

interface ChartProps {
  data: { name: string; amount: number }[];
}

export default function ContributionChart({ data }: ChartProps) {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground">No contributions yet.</p>;
  }

  return (
    <ChartContainer
      config={{}}
      className="mx-auto aspect-square max-h-[350px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#0088FE"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
