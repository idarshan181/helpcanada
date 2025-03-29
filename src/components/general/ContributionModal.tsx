'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useContributionStore } from '@/store/useContributionStore';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ContributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContributionModal: React.FC<ContributionModalProps> = ({ open, onOpenChange }) => {
  const history = useContributionStore(state => state.history);
  const total = useContributionStore(state => state.totalContribution);

  const chartData = useMemo(() => {
    return history
      .sort((a, b) => a.year - b.year || a.month - b.month)
      .map(item => ({
        name: `${item.month}/${item.year}`,
        amount: item.amount,
      }));
  }, [history]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Contributions</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Total Lifetime Contribution:
            {' '}
            <strong>
              $
              {total.toFixed(2)}
            </strong>
          </p>

          {chartData.length === 0
            ? (
                <p className="text-sm text-muted-foreground">No contributions yet.</p>
              )
            : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
