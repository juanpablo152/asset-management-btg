import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-banner',
  imports: [],
  templateUrl: './error-banner.component.html',
  styleUrl: './error-banner.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorBannerComponent {
  @Input() message: string | null = null;
  @Output() closed = new EventEmitter<void>();
}
