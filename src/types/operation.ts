export type Operation = {
    id: number;
    year: number;
    month: number;
    userGain: number;
    userLost: number;
    userTotalBalance?: number;
    dayTransactions?: number;
    createdAt: number;
    userId?: number;
  };