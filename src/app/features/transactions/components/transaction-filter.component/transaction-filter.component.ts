import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { TransactionType } from '../../../../core/models/transaction.model';
import { TransactionFilterValue } from '../../../../shared/types/transaction-filter.interface';

@Component({
  selector: 'app-transaction-filter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-filter.component.html',
  styleUrl: './transaction-filter.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFilterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  @Output() filterChange = new EventEmitter<TransactionFilterValue>();

  readonly form = this.fb.nonNullable.group({
    type: this.fb.nonNullable.control<TransactionFilterValue['type']>('ALL'),
    search: this.fb.nonNullable.control<TransactionFilterValue['search']>(''),
  });

  constructor() {
    this.form.valueChanges
      .pipe(
        startWith(this.form.getRawValue()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.filterChange.emit({
          type: value.type as TransactionFilterValue['type'],
          search: value.search as TransactionFilterValue['search'],
        });
      });
  }
}