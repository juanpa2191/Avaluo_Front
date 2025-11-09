import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SelectComponent, SelectOption } from '../../../../shared/components/select/select.component';
import { MultiSelectComponent } from '../../../../shared/components/multi-select/multi-select.component';
import { TextareaComponent } from '../../../../shared/components/textarea/textarea.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacion-general',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputComponent,
    SelectComponent,
    MultiSelectComponent,
    TextareaComponent
  ],
  templateUrl: './informacion-general.component.html',
  styleUrls: ['./informacion-general.component.css']
})
export class InformacionGeneralComponent {
  @Input() form!: FormGroup;
  @Input() isEdit = false;
  @Output() next = new EventEmitter<void>();

  // Opciones para selects
  departamentosOptions: SelectOption[] = [
    { label: 'Cundinamarca', value: 'Cundinamarca' },
    { label: 'Antioquia', value: 'Antioquia' },
    { label: 'Valle del Cauca', value: 'Valle del Cauca' },
    { label: 'Santander', value: 'Santander' },
    { label: 'Atlántico', value: 'Atlántico' },
    { label: 'Bolívar', value: 'Bolívar' },
    { label: 'Boyacá', value: 'Boyacá' },
    { label: 'Caldas', value: 'Caldas' },
    { label: 'Caquetá', value: 'Caquetá' },
    { label: 'Casanare', value: 'Casanare' },
    { label: 'Cauca', value: 'Cauca' },
    { label: 'Cesar', value: 'Cesar' },
    { label: 'Chocó', value: 'Chocó' },
    { label: 'Córdoba', value: 'Córdoba' },
    { label: 'Cundinamarca', value: 'Cundinamarca' },
    { label: 'Guainía', value: 'Guainía' },
    { label: 'Guaviare', value: 'Guaviare' },
    { label: 'Huila', value: 'Huila' },
    { label: 'La Guajira', value: 'La Guajira' },
    { label: 'Magdalena', value: 'Magdalena' },
    { label: 'Meta', value: 'Meta' },
    { label: 'Nariño', value: 'Nariño' },
    { label: 'Norte de Santander', value: 'Norte de Santander' },
    { label: 'Putumayo', value: 'Putumayo' },
    { label: 'Quindío', value: 'Quindío' },
    { label: 'Risaralda', value: 'Risaralda' },
    { label: 'San Andrés y Providencia', value: 'San Andrés y Providencia' },
    { label: 'Santander', value: 'Santander' },
    { label: 'Sucre', value: 'Sucre' },
    { label: 'Tolima', value: 'Tolima' },
    { label: 'Valle del Cauca', value: 'Valle del Cauca' },
    { label: 'Vaupés', value: 'Vaupés' },
    { label: 'Vichada', value: 'Vichada' }
  ];

  objetoAvaluoOptions: SelectOption[] = [
    { label: 'Apartamento', value: 'Apartamento' },
    { label: 'Casa', value: 'Casa' },
    { label: 'Casa Lote', value: 'Casa Lote' },
    { label: 'Local Comercial', value: 'Local Comercial' },
    { label: 'Oficina', value: 'Oficina' },
    { label: 'Bodega', value: 'Bodega' },
    { label: 'Lote', value: 'Lote' },
    { label: 'Finca', value: 'Finca' },
    { label: 'Apartaestudio', value: 'Apartaestudio' },
    { label: 'Penthouse', value: 'Penthouse' },
    { label: 'Dúplex', value: 'Dúplex' },
    { label: 'Tríplex', value: 'Tríplex' }
  ];

  destinoAvaluoOptions: SelectOption[] = [
    { label: 'Venta', value: 'Venta' },
    { label: 'Hipoteca', value: 'Hipoteca' },
    { label: 'Remate', value: 'Remate' },
    { label: 'Dación en Pago', value: 'Dación en Pago' },
    { label: 'Avalúo Judicial', value: 'Avalúo Judicial' },
    { label: 'Divorcio', value: 'Divorcio' },
    { label: 'Herencia', value: 'Herencia' },
    { label: 'Donación', value: 'Donación' },
    { label: 'Permuta', value: 'Permuta' },
    { label: 'Seguro', value: 'Seguro' },
    { label: 'Expropiación', value: 'Expropiación' }
  ];

  responsabilidadesOptions: SelectOption[] = [
    { label: 'Evaluación física completa del inmueble', value: 'Evaluación física completa del inmueble' },
    { label: 'Análisis de mercado inmobiliario actual', value: 'Análisis de mercado inmobiliario actual' },
    { label: 'Valoración comparativa con propiedades similares', value: 'Valoración comparativa con propiedades similares' },
    { label: 'Estudio de tendencias del sector inmobiliario', value: 'Estudio de tendencias del sector inmobiliario' },
    { label: 'Análisis de títulos y documentos legales', value: 'Análisis de títulos y documentos legales' },
    { label: 'Informe técnico detallado', value: 'Informe técnico detallado' },
    { label: 'Fotografías profesionales del inmueble', value: 'Fotografías profesionales del inmueble' },
    { label: 'Determinación del valor comercial', value: 'Determinación del valor comercial' }
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
    return '';
  }

  onNext() {
    if (this.form.valid) {
      this.next.emit();
    }
  }
}