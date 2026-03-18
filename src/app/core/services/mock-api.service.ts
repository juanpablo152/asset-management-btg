import { Injectable } from '@angular/core';
import { Observable, timer, map } from 'rxjs';
import { InitialWalletData, Wallet } from '../../shared/types/wallet.interface';
import { Fund, FundPosition } from '../models/fund.model';
import { NotificationMethod } from '../models/notification-method.type';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  private readonly latency = 400;

  private readonly funds: Fund[] = [
    {
      id: 1,
      name: 'FPV_BTG_PACTUAL_RECAUDADORA',
      minimumAmount: 75000,
      category: 'FPV',
    },
    {
      id: 2,
      name: 'FPV_BTG_PACTUAL_ECOPETROL',
      minimumAmount: 125000,
      category: 'FPV',
    },
    {
      id: 3,
      name: 'DEUDAPRIVADA',
      minimumAmount: 50000,
      category: 'FIC',
    },
    {
      id: 4,
      name: 'FDO-ACCIONES',
      minimumAmount: 250000,
      category: 'FIC',
    },
    {
      id: 5,
      name: 'FPV_BTG_PACTUAL_DINAMICA',
      minimumAmount: 100000,
      category: 'FPV',
    },
  ];

  private balance = 500000;
  private positions: FundPosition[] = [];
  private transactions: Transaction[] = [];

  getInitialData(): Observable<InitialWalletData> {
    return this.simulate(() => ({
      funds: this.funds.map((fund) => ({ ...fund })),
      ...this.snapshot(),
    }));
  }

  subscribeToFund(
    fundId: number,
    notificationMethod: NotificationMethod
  ): Observable<Wallet> {
    return this.simulate(() => {
      const fund = this.funds.find((item) => item.id === fundId);

      if (!fund) {
        throw new Error('El fondo solicitado no existe.');
      }

      const existingPosition = this.positions.find((item) => item.fundId === fundId);

      if (existingPosition) {
        throw new Error('Ya existe una suscripción activa para este fondo.');
      }

      if (this.balance < fund.minimumAmount) {
        throw new Error(
          `No tienes saldo disponible para vincularte al fondo ${fund.name}.`
        );
      }

      const now = new Date().toISOString();

      this.balance -= fund.minimumAmount;

      this.positions = [
        ...this.positions,
        {
          fundId,
          amount: fund.minimumAmount,
          subscribedAt: now,
          notificationMethod,
        },
      ];

      this.transactions = [
        {
          id: this.buildId('sub'),
          fundId,
          fundName: fund.name,
          type: 'SUBSCRIPTION',
          amount: fund.minimumAmount,
          createdAt: now,
          notificationMethod,
        },
        ...this.transactions,
      ];

      return this.snapshot();
    });
  }

  cancelFundSubscription(fundId: number): Observable<Wallet> {
    return this.simulate(() => {
      const fund = this.funds.find((item) => item.id === fundId);

      if (!fund) {
        throw new Error('El fondo solicitado no existe.');
      }

      const existingPosition = this.positions.find((item) => item.fundId === fundId);

      if (!existingPosition) {
        throw new Error('No existe una suscripción activa para cancelar.');
      }

      const now = new Date().toISOString();

      this.balance += existingPosition.amount;
      this.positions = this.positions.filter((item) => item.fundId !== fundId);

      this.transactions = [
        {
          id: this.buildId('can'),
          fundId,
          fundName: fund.name,
          type: 'CANCELLATION',
          amount: existingPosition.amount,
          createdAt: now,
        },
        ...this.transactions,
      ];

      return this.snapshot();
    });
  }

  private snapshot(): Wallet {
    return {
      balance: this.balance,
      positions: this.positions.map((item) => ({ ...item })),
      transactions: this.transactions.map((item) => ({ ...item })),
    };
  }

  private simulate<T>(operation: () => T): Observable<T> {
    return timer(this.latency).pipe(map(() => operation()));
  }

  private buildId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
