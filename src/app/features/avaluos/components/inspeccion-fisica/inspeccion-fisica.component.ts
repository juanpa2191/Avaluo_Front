import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SelectComponent, SelectOption } from '../../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../../shared/components/textarea/textarea.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inspeccion-fisica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputComponent,
    SelectComponent,
    TextareaComponent
  ],
  templateUrl: './inspeccion-fisica.component.html',
  styleUrls: ['./inspeccion-fisica.component.css']
})
export class InspeccionFisicaComponent {
  @Input() form!: FormGroup;
  @Input() isEdit = false;
  @Output() previous = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  clasificacionSueloOptions: SelectOption[] = [
    { label: 'Urbano', value: 'Urbano' },
    { label: 'Rural', value: 'Rural' },
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Comercial', value: 'Comercial' },
    { label: 'Residencial', value: 'Residencial' },
    { label: 'Institucional', value: 'Institucional' }
  ];

  categoriaUsoOptions: SelectOption[] = [
    { label: 'Residencial', value: 'Residencial' },
    { label: 'Comercial', value: 'Comercial' },
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Institucional', value: 'Institucional' },
    { label: 'Dotacional', value: 'Dotacional' },
    { label: 'Recreacional', value: 'Recreacional' }
  ];

  subcategoriaUsoOptions: SelectOption[] = [
    { label: 'Vivienda unifamiliar', value: 'Vivienda unifamiliar' },
    { label: 'Vivienda multifamiliar', value: 'Vivienda multifamiliar' },
    { label: 'Vivienda colectiva', value: 'Vivienda colectiva' },
    { label: 'Comercio local', value: 'Comercio local' },
    { label: 'Comercio mayorista', value: 'Comercio mayorista' },
    { label: 'Oficinas', value: 'Oficinas' },
    { label: 'Hotelería', value: 'Hotelería' },
    { label: 'Educación', value: 'Educación' },
    { label: 'Salud', value: 'Salud' },
    { label: 'Deportes', value: 'Deportes' }
  ];

  tratamientoOptions: SelectOption[] = [
    { label: 'Protección', value: 'Protección' },
    { label: 'Desarrollo', value: 'Desarrollo' },
    { label: 'Renovación', value: 'Renovación' },
    { label: 'Mejoramiento', value: 'Mejoramiento' },
    { label: 'Ninguno', value: 'Ninguno' }
  ];

  estadoConservacionOptions: SelectOption[] = [
    { label: 'Excelente', value: 'Excelente' },
    { label: 'Bueno', value: 'Bueno' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Malo', value: 'Malo' },
    { label: 'Muy malo', value: 'Muy malo' }
  ];

  amenazaMovimientoMasaOptions: SelectOption[] = [
    { label: 'Ninguna', value: 'Ninguna' },
    { label: 'Baja', value: 'Baja' },
    { label: 'Media', value: 'Media' },
    { label: 'Alta', value: 'Alta' },
    { label: 'Muy alta', value: 'Muy alta' }
  ];

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength']?.requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (field?.hasError('min')) {
      return 'El valor debe ser mayor a 0';
    }
    return '';
  }

  onPrevious() {
    this.previous.emit();
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit();
    }
  }
}