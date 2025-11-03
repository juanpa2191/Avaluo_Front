import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() error = '';
  @Input() options: SelectOption[] = [];
  @Input() selectClass = '';

  selectedItems: any[] = [];
  multiSelectId = `multi-select-${Math.random().toString(36).substr(2, 9)}`;

  private onChange = (value: any[]) => {};
  private onTouched = () => {};

  get availableOptions(): SelectOption[] {
    return this.options.filter(option =>
      !this.selectedItems.includes(option.value)
    );
  }

  getOptionLabel(value: any): string {
    const option = this.options.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  writeValue(value: any[]): void {
    this.selectedItems = value || [];
  }

  registerOnChange(fn: (value: any[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implementar si es necesario
  }

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    if (value && !this.selectedItems.includes(value)) {
      this.selectedItems = [...this.selectedItems, value];
      this.onChange(this.selectedItems);
    }

    // Reset select
    target.value = '';
  }

  removeItem(index: number): void {
    this.selectedItems.splice(index, 1);
    this.selectedItems = [...this.selectedItems];
    this.onChange(this.selectedItems);
  }
}