import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './confirm-dialog.component.html',
  styles: [`
    .confirm-content {
      text-align: center;
      padding: 20px 0;
    }

    .warning-icon {
      font-size: 3rem;
      color: #f59e0b;
      margin-bottom: 15px;
    }

    .confirm-message {
      font-size: 1.1rem;
      font-weight: 500;
      color: #374151;
      margin: 0 0 10px 0;
    }

    .confirm-detail {
      font-size: 0.9rem;
      color: #6b7280;
      margin: 0;
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() message = '¿Está seguro de que desea continuar?';
  @Input() detail = '';
  @Input() confirmLabel = 'Confirmar';
  @Input() confirmIcon = 'pi pi-check';
  @Input() loading = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}