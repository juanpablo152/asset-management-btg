import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-balance-summary',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './balance-summary.component.html',
  styleUrl: './balance-summary.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceSummaryComponent {
  @Input() balance: number | undefined = 0;
  @Input() investedTotal: number | undefined = 0;
  @Input() activeCount: number | undefined = 0;
}
