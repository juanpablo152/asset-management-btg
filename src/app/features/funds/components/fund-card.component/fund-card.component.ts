import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FundCardVm } from '../../../../core/models/fund.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-fund-card',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './fund-card.component.html',
  styleUrl: './fund-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundCardComponent {
  @Input() fund!: FundCardVm;
  @Input() busy = false;

  @Output() subscribeRequested = new EventEmitter<FundCardVm>();
  @Output() cancelRequested = new EventEmitter<FundCardVm>();
}
