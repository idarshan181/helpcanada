/* eslint-disable no-console */
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useContributionStore } from '@/store/useContributionStore';

import { signIn, useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '../ui/button';

interface ContributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContributionModal: React.FC<ContributionModalProps> = ({ open, onOpenChange }) => {
  const { data: session } = useSession();
  const store = useContributionStore();

  const chartData = useMemo(() => {
    return store.history
      .sort((a, b) => a.year - b.year || a.month - b.month)
      .map(item => ({
        name: `${item.month}/${item.year}`,
        amount: item.amount,
      }));
  }, [store.history]);

  console.log('session', session);

  if (!session) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">Please log in to view your contribution insights.</p>
            <Button onClick={() => signIn('google')}>Sign in with Google</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
              {store.totalContribution.toFixed(2)}
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
