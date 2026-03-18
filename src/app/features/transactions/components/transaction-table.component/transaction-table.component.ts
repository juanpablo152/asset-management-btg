import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component/empty-state.component';
import { Transaction } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-table',
  imports: [CommonModule, CurrencyPipe, DatePipe, EmptyStateComponent],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionTableComponent {
  @Input() transactions: Transaction[] = [];
}
