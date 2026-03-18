import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TransactionType } from '../../../core/models/transaction.model';
import { WalletStore } from '../../../core/state/wallet.store';

interface TransactionsFilterState {
  type: 'ALL' | TransactionType;
  search: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsFacade {
  private readonly store = inject(WalletStore);

  private readonly filterSubject = new BehaviorSubject<TransactionsFilterState>({
    type: 'ALL',
    search: '',
  });

  readonly filter$ = this.filterSubject.asObservable();
  readonly loading$ = this.store.loading$;
  readonly error$ = this.store.error$;

  readonly transactions$ = combineLatest([
    this.store.transactions$,
    this.filter$,
  ]).pipe(
    map(([transactions, filter]) => {
      const search = filter.search.trim().toLowerCase();

      return transactions.filter((transaction) => {
        const typeMatches =
          filter.type === 'ALL' || transaction.type === filter.type;

        const searchMatches =
          !search ||
          transaction.fundName.toLowerCase().includes(search) ||
          transaction.type.toLowerCase().includes(search) ||
          (transaction.notificationMethod ?? '').toLowerCase().includes(search);

        return typeMatches && searchMatches;
      });
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  load(): void {
    this.store.load();
  }

  updateFilter(filter: Partial<TransactionsFilterState>): void {
    this.filterSubject.next({
      ...this.filterSubject.value,
      ...filter,
    });
  }

  clearError(): void {
    this.store.clearError();
  }
}