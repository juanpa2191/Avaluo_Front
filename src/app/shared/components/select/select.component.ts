import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() error = '';
  @Input() options: SelectOption[] = [];
  @Input() selectClass = '';

  value: any = '';
  selectId = `select-${Math.random().toString(36).substr(2, 9)}`;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || (this.multiple ? [] : '');
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    let selectedValue: any;

    if (this.multiple) {
      const selectedOptions = Array.from(target.selectedOptions);
      selectedValue = selectedOptions.map(option => option.value);
    } else {
      selectedValue = target.value;
    }

    this.value = selectedValue;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}