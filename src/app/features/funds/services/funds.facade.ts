import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationMethod } from '../../../core/models/notification-method.type';
import { WalletStore } from '../../../core/state/wallet.store';

@Injectable({
  providedIn: 'root',
})
export class FundsFacade {
  private readonly store = inject(WalletStore);

  readonly funds$ = this.store.fundsVm$;
  readonly summary$ = this.store.summary$;
  readonly loading$ = this.store.loading$;
  readonly actionLoading$ = this.store.actionLoading$;
  readonly error$ = this.store.error$;

  load(): void {
    this.store.load();
  }

  subscribeToFund(
    fundId: number,
    notificationMethod: NotificationMethod
  ): Observable<boolean> {
    return this.store.subscribeToFund(fundId, notificationMethod);
  }

  cancelFundSubscription(fundId: number): Observable<boolean> {
    return this.store.cancelFundSubscription(fundId);
  }

  clearError(): void {
    this.store.clearError();
  }
}