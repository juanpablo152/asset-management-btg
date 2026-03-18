import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TransactionsFacade } from '../../services/transactions.facade';
import { CommonModule } from '@angular/common';
import { ErrorBannerComponent } from '../../../../shared/components/error-banner/error-banner.component/error-banner.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component/loading-spinner.component';
import { TransactionFilterComponent } from '../../components/transaction-filter.component/transaction-filter.component';
import { TransactionTableComponent } from '../../components/transaction-table.component/transaction-table.component';
import { TransactionFilterValue } from '../../../../shared/types/transaction-filter.interface';

@Component({
  selector: 'app-transactions-page',
  imports: [
    CommonModule,
    ErrorBannerComponent,
    LoadingSpinnerComponent,
    TransactionFilterComponent,
    TransactionTableComponent,],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsPageComponent {
  private readonly facade = inject(TransactionsFacade);

  readonly transactions$ = this.facade.transactions$;
  readonly loading$ = this.facade.loading$;
  readonly error$ = this.facade.error$;

  ngOnInit(): void {
    this.facade.load();
  }

  updateFilter(filter: TransactionFilterValue): void {
    this.facade.updateFilter(filter);
  }

  clearError(): void {
    this.facade.clearError();
  }
}