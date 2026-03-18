import { FundPosition, Fund } from "../../core/models/fund.model";
import { Transaction } from "../../core/models/transaction.model";

export interface Wallet {
    balance: number;
    positions: FundPosition[];
    transactions: Transaction[];
  }
  
  export interface InitialWalletData extends Wallet {
    funds: Fund[];
  }
  