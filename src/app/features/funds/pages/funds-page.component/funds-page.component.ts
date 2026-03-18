import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorBannerComponent } from '../../../../shared/components/error-banner/error-banner.component/error-banner.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component/loading-spinner.component';
import { BalanceSummaryComponent } from '../../components/balance-summary.component/balance-summary.component';
import { CancelDialogComponent } from '../../components/cancel-dialog.component/cancel-dialog.component';
import { FundListComponent } from '../../components/fund-list.component/fund-list.component';
import { SubscribeDialogComponent } from '../../components/subscribe-dialog.component/subscribe-dialog.component';
import { take } from 'rxjs';
import { FundCardVm } from '../../../../core/models/fund.model';
import { NotificationMethod } from '../../../../core/models/notification-method.type';
import { FundsFacade } from '../../services/funds.facade';

@Component({
  selector: 'app-funds-page.component',
  imports: [CommonModule,
    ErrorBannerComponent,
    LoadingSpinnerComponent,
    BalanceSummaryComponent,
    FundListComponent,
    SubscribeDialogComponent,
    CancelDialogComponent,],
  templateUrl: './funds-page.component.html',
  styleUrl: './funds-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundsPageComponent {
  private readonly facade = inject(FundsFacade);

  readonly funds$ = this.facade.funds$;
  readonly summary$ = this.facade.summary$;
  readonly loading$ = this.facade.loading$;
  readonly actionLoading$ = this.facade.actionLoading$;
  readonly error$ = this.facade.error$;

  selectedForSubscription: FundCardVm | null = null;
  selectedForCancellation: FundCardVm | null = null;

  ngOnInit(): void {
    this.facade.load();
  }

  openSubscribeDialog(fund: FundCardVm): void {
    this.selectedForSubscription = fund;
    this.selectedForCancellation = null;
  }

  openCancelDialog(fund: FundCardVm): void {
    this.selectedForCancellation = fund;
    this.selectedForSubscription = null;
  }

  confirmSubscription(notificationMethod: NotificationMethod): void {
    if (!this.selectedForSubscription) {
      return;
    }

    this.facade
      .subscribeToFund(this.selectedForSubscription.id, notificationMethod)
      .pipe(take(1))
      .subscribe((success) => {
        if (success) {
          this.selectedForSubscription = null;
        }
      });
  }

  confirmCancellation(): void {
    if (!this.selectedForCancellation) {
      return;
    }

    this.facade
      .cancelFundSubscription(this.selectedForCancellation.id)
      .pipe(take(1))
      .subscribe((success) => {
        if (success) {
          this.selectedForCancellation = null;
        }
      });
  }

  clearError(): void {
    this.facade.clearError();
  }
}