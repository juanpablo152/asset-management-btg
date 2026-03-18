import { NotificationMethod } from './notification-method.type';

export type FundCategory = 'FPV' | 'FIC';

export interface Fund {
  id: number;
  name: string;
  minimumAmount: number;
  category: FundCategory;
}

export interface FundPosition {
  fundId: number;
  amount: number;
  subscribedAt: string;
  notificationMethod: NotificationMethod;
}

export interface FundCardVm extends Fund {
  isSubscribed: boolean;
  investedAmount: number;
  subscribedAt: string | null;
  notificationMethod: NotificationMethod | null;
}