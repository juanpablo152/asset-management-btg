import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FundCardVm } from '../../../../core/models/fund.model';
import { NotificationMethod } from '../../../../core/models/notification-method.type';

@Component({
  selector: 'app-subscribe-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subscribe-dialog.component.html',
  styleUrl: './subscribe-dialog.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribeDialogComponent {
  @Input() fund!: FundCardVm;
  @Input() busy = false;

  @Output() confirmed = new EventEmitter<NotificationMethod>();
  @Output() closed = new EventEmitter<void>();

  readonly form = new FormGroup({
    notificationMethod: new FormControl<NotificationMethod | null>(null, {
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.confirmed.emit(this.form.controls.notificationMethod.value as NotificationMethod);
  }

}
