import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 365) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
};

interface ContributionHistoryItem {
  month: number;
  year: number;
  amount: number;
}

interface ContributionState {
  guestId: string;
  current: number;
  history: ContributionHistoryItem[];
  totalContribution: number;
  synced: boolean;
  addContribution: (amount: number) => void;
  reset: () => void;
  markAsSynced: () => void;
  setGuestId: (id: string) => void;
  setTotalContribution: (amount: number) => void; // ✅ Add this
}

export const useContributionStore = create<ContributionState>()(
  persist(
    (set, get) => ({
      guestId: '',
      current: 0,
      history: [],
      totalContribution: 0,
      synced: false,

      addContribution: (amount) => {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const existing = get().history.find(
          item => item.month === month && item.year === year,
        );

        let updatedHistory: ContributionHistoryItem[];
        if (existing) {
          updatedHistory = get().history.map(item =>
            item.month === month && item.year === year
              ? { ...item, amount: item.amount + amount }
              : item,
          );
        } else {
          updatedHistory = [...get().history, { month, year, amount }];
        }

        set({
          current: get().current + amount,
          history: updatedHistory,
          totalContribution: get().totalContribution + amount,
          synced: false,
        });
      },

      reset: () => {
        set({
          current: 0,
          history: [],
          totalContribution: 0,
          synced: false,
        });
      },

      markAsSynced: () => {
        set({ synced: true });
      },

      setGuestId: (id: string) => {
        localStorage.setItem('guestId', id);
        setCookie('guestId', id);
        set({ guestId: id });
      },
      setTotalContribution: (amount: number) => {
        set({ totalContribution: amount });
      },
    }),
    {
      name: 'contribution-store',
      partialize: state => ({
        guestId: state.guestId,
        current: state.current,
        history: state.history,
        totalContribution: state.totalContribution,
        synced: state.synced,
      }),
    },
  ),
);

// ✅ Guest ID initialization (client-only)
if (typeof window !== 'undefined') {
  const existingGuestId = localStorage.getItem('guestId') || getCookie('guestId');

  if (!existingGuestId) {
    const newGuestId = uuidv4();
    localStorage.setItem('guestId', newGuestId);
    setCookie('guestId', newGuestId);
    useContributionStore.setState({ guestId: newGuestId });
  } else {
    localStorage.setItem('guestId', existingGuestId);
    setCookie('guestId', existingGuestId);
    useContributionStore.setState({ guestId: existingGuestId });
  }
}
