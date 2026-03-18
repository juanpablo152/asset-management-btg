import { TransactionType } from "../../core/models/transaction.model";

export interface TransactionFilterValue {
    type: 'ALL' | TransactionType;
    search: string;
  }