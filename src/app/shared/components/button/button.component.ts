import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonSize = 'small' | 'normal' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() type: ButtonType = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'normal';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() rounded = false;
  @Input() outlined = false;
  @Input() text = false;
  @Input() raised = false;
  @Input() link = false;

  @Output() onClick = new EventEmitter<Event>();

  get buttonClasses(): string {
    const classes = ['app-button'];

    // Variant classes
    classes.push(`app-button-${this.variant}`);

    // Size classes
    classes.push(`app-button-${this.size}`);

    // State classes
    if (this.disabled || this.loading) classes.push('app-button-disabled');
    if (this.loading) classes.push('app-button-loading');
    if (this.rounded) classes.push('app-button-rounded');
    if (this.outlined) classes.push('app-button-outlined');
    if (this.text) classes.push('app-button-text');
    if (this.raised) classes.push('app-button-raised');
    if (this.link) classes.push('app-button-link');

    return classes.join(' ');
  }

  get iconClasses(): string {
    const classes = ['app-button-icon'];

    if (this.iconPosition === 'right') {
      classes.push('app-button-icon-right');
    }

    return classes.join(' ');
  }

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}