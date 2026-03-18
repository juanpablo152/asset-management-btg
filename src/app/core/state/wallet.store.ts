import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs/operators';
import { Fund, FundCardVm, FundPosition } from '../models/fund.model';
import { NotificationMethod } from '../models/notification-method.type';
import { Transaction } from '../models/transaction.model';
import { InitialWalletData, Wallet } from '../../shared/types/wallet.interface';
import { MockApiService } from '../services/mock-api.service';

export interface WalletState {
  funds: Fund[];
  balance: number;
  positions: FundPosition[];
  transactions: Transaction[];
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
  initialized: boolean;
}

export interface WalletSummaryVm {
  balance: number;
  investedTotal: number;
  activeCount: number;
}

const initialState: WalletState = {
  funds: [],
  balance: 0,
  positions: [],
  transactions: [],
  loading: false,
  actionLoading: false,
  error: null,
  initialized: false,
};

@Injectable({
  providedIn: 'root',
})
export class WalletStore {
  private readonly api = inject(MockApiService);

  private readonly stateSubject = new BehaviorSubject<WalletState>(initialState);
  readonly state$ = this.stateSubject.asObservable();

  readonly funds$ = this.select((state) => state.funds);
  readonly balance$ = this.select((state) => state.balance);
  readonly positions$ = this.select((state) => state.positions);
  readonly transactions$ = this.select((state) => state.transactions);
  readonly loading$ = this.select((state) => state.loading);
  readonly actionLoading$ = this.select((state) => state.actionLoading);
  readonly error$ = this.select((state) => state.error);
  readonly initialized$ = this.select((state) => state.initialized);

  readonly fundsVm$ = combineLatest([this.funds$, this.positions$]).pipe(
    map(([funds, positions]) =>
      funds.map<FundCardVm>((fund) => {
        const position = positions.find((item) => item.fundId === fund.id);

        return {
          ...fund,
          isSubscribed: !!position,
          investedAmount: position?.amount ?? 0,
          subscribedAt: position?.subscribedAt ?? null,
          notificationMethod: position?.notificationMethod ?? null,
        };
      })
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly summary$ = combineLatest([this.balance$, this.positions$]).pipe(
    map(([balance, positions]) => ({
      balance,
      investedTotal: positions.reduce((acc, item) => acc + item.amount, 0),
      activeCount: positions.length,
    })),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  load(force = false): void {
    const currentState = this.stateSubject.value;

    if (currentState.initialized && !force) {
      return;
    }

    this.patchState({
      loading: true,
      error: null,
    });

    this.api
      .getInitialData()
      .pipe(
        take(1),
        finalize(() => {
          this.patchState({ loading: false });
        })
      )
      .subscribe({
        next: (data) => this.applyInitialData(data),
        error: (error) => {
          this.patchState({
            error: this.toMessage(error),
          });
        },
      });
  }

  subscribeToFund(
    fundId: number,
    notificationMethod: NotificationMethod
  ): Observable<boolean> {
    this.patchState({
      actionLoading: true,
      error: null,
    });

    return this.api.subscribeToFund(fundId, notificationMethod).pipe(
      take(1),
      tap((snapshot) => this.applyWalletSnapshot(snapshot)),
      map(() => true),
      catchError((error) => {
        this.patchState({
          error: this.toMessage(error),
        });

        return of(false);
      }),
      finalize(() => {
        this.patchState({ actionLoading: false });
      })
    );
  }

  cancelFundSubscription(fundId: number): Observable<boolean> {
    this.patchState({
      actionLoading: true,
      error: null,
    });

    return this.api.cancelFundSubscription(fundId).pipe(
      take(1),
      tap((snapshot) => this.applyWalletSnapshot(snapshot)),
      map(() => true),
      catchError((error) => {
        this.patchState({
          error: this.toMessage(error),
        });

        return of(false);
      }),
      finalize(() => {
        this.patchState({ actionLoading: false });
      })
    );
  }

  clearError(): void {
    this.patchState({ error: null });
  }

  private applyInitialData(data: InitialWalletData): void {
    this.patchState({
      funds: data.funds,
      balance: data.balance,
      positions: data.positions,
      transactions: data.transactions,
      initialized: true,
      error: null,
    });
  }

  private applyWalletSnapshot(snapshot: Wallet): void {
    this.patchState({
      balance: snapshot.balance,
      positions: snapshot.positions,
      transactions: snapshot.transactions,
      initialized: true,
      error: null,
    });
  }

  private patchState(partial: Partial<WalletState>): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...partial,
    });
  }

  private select<T>(selector: (state: WalletState) => T): Observable<T> {
    return this.state$.pipe(
      map(selector),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  private toMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Ocurrió un error inesperado.';
  }
}