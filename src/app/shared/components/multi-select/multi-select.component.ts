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
  styles: [`
    .form-field {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
    }

    .multi-select-container {
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background-color: white;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .multi-select-container:focus-within {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .selected-items {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      padding: 0.5rem;
      min-height: 2rem;
    }

    .selected-item {
      display: inline-flex;
      align-items: center;
      background: #e5e7eb;
      color: #374151;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
    }

    .remove-btn {
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      margin-left: 0.25rem;
      font-size: 1.2em;
      line-height: 1;
      padding: 0;
      width: 1rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .remove-btn:hover {
      color: #dc2626;
    }

    select {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-top: 1px solid #e5e7eb;
      font-size: 0.875rem;
      background-color: #f9fafb;
      appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
    }

    select:focus {
      outline: none;
      background-color: white;
    }

    .form-error {
      display: block;
      margin-top: 0.25rem;
      color: #dc2626;
      font-size: 0.75rem;
    }
  `],
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