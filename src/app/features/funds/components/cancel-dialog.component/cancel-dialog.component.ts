import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FundCardVm } from '../../../../core/models/fund.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cancel-dialog',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cancel-dialog.component.html',
  styleUrl: './cancel-dialog.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelDialogComponent {
  @Input() fund!: FundCardVm;
  @Input() busy = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
}
