import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FundCardVm } from '../../../../core/models/fund.model';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component/empty-state.component';
import { FundCardComponent } from '../fund-card.component/fund-card.component';

@Component({
  selector: 'app-fund-list',
  imports: [CommonModule, FundCardComponent, EmptyStateComponent],
  templateUrl: './fund-list.component.html',
  styleUrl: './fund-list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundListComponent {
  @Input() funds: FundCardVm[] = [];
  @Input() busy = false;

  @Output() subscribeRequested = new EventEmitter<FundCardVm>();
  @Output() cancelRequested = new EventEmitter<FundCardVm>();
}
