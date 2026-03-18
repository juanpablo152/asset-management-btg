import { NotificationMethod } from './notification-method.type';

export type TransactionType = 'SUBSCRIPTION' | 'CANCELLATION';

export interface Transaction {
  id: string;
  fundId: number;
  fundName: string;
  type: TransactionType;
  amount: number;
  createdAt: string;
  notificationMethod?: NotificationMethod;
}