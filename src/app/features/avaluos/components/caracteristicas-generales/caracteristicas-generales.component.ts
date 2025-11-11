import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SelectComponent, SelectOption } from '../../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../../shared/components/textarea/textarea.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-caracteristicas-generales',
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
  templateUrl: './caracteristicas-generales.component.html',
  styleUrls: ['./caracteristicas-generales.component.css']
})
export class CaracteristicasGeneralesComponent {
  @Input() form!: FormGroup;
  @Input() isEdit = false;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  formaTerrenoOptions: SelectOption[] = [
    { label: 'Rectangular', value: 'Rectangular' },
    { label: 'Cuadrado', value: 'Cuadrado' },
    { label: 'Irregular', value: 'Irregular' },
    { label: 'Triangular', value: 'Triangular' },
    { label: 'Poligonal', value: 'Poligonal' },
    { label: 'Circular', value: 'Circular' }
  ];

  estratoOptions: SelectOption[] = [
    { label: 'Estrato 1', value: 'Estrato 1' },
    { label: 'Estrato 2', value: 'Estrato 2' },
    { label: 'Estrato 3', value: 'Estrato 3' },
    { label: 'Estrato 4', value: 'Estrato 4' },
    { label: 'Estrato 5', value: 'Estrato 5' },
    { label: 'Estrato 6', value: 'Estrato 6' },
    { label: 'Rural', value: 'Rural' }
  ];

  entornoOptions: SelectOption[] = [
    { label: 'Residencial', value: 'Residencial' },
    { label: 'Comercial', value: 'Comercial' },
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Institucional', value: 'Institucional' },
    { label: 'Mixto', value: 'Mixto' },
    { label: 'Rural', value: 'Rural' }
  ];

  usoPrincipalOptions: SelectOption[] = [
    { label: 'Residencial', value: 'Residencial' },
    { label: 'Comercial', value: 'Comercial' },
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Institucional', value: 'Institucional' },
    { label: 'Dotacional', value: 'Dotacional' },
    { label: 'Recreacional', value: 'Recreacional' }
  ];

  usoComplementarioOptions: SelectOption[] = [
    { label: 'Comercio local', value: 'Comercio local' },
    { label: 'Oficinas pequeñas', value: 'Oficinas pequeñas' },
    { label: 'Servicios', value: 'Servicios' },
    { label: 'Turístico', value: 'Turístico' },
    { label: 'Ninguno', value: 'Ninguno' }
  ];

  usoCondicionadoOptions: SelectOption[] = [
    { label: 'Equipamientos', value: 'Equipamientos' },
    { label: 'Infraestructura', value: 'Infraestructura' },
    { label: 'Espacios públicos', value: 'Espacios públicos' },
    { label: 'Ninguno', value: 'Ninguno' }
  ];

  tipoAccesoOptions: SelectOption[] = [
    { label: 'Directo', value: 'Directo' },
    { label: 'Indirecto', value: 'Indirecto' },
    { label: 'Restringido', value: 'Restringido' },
    { label: 'Privado', value: 'Privado' }
  ];

  disponibilidadOptions: SelectOption[] = [
    { label: 'Disponible', value: 'Disponible' },
    { label: 'No disponible', value: 'No disponible' },
    { label: 'Limitado', value: 'Limitado' }
  ];

  tipoPavimentoOptions: SelectOption[] = [
    { label: 'Asfalto', value: 'Asfalto' },
    { label: 'Concreto', value: 'Concreto' },
    { label: 'Piedra', value: 'Piedra' },
    { label: 'Tierra', value: 'Tierra' },
    { label: 'Sin pavimentar', value: 'Sin pavimentar' }
  ];

  estadoPavimentoOptions: SelectOption[] = [
    { label: 'Excelente', value: 'Excelente' },
    { label: 'Bueno', value: 'Bueno' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Malo', value: 'Malo' },
    { label: 'Muy malo', value: 'Muy malo' }
  ];

  estadoAndenesOptions: SelectOption[] = [
    { label: 'Excelente', value: 'Excelente' },
    { label: 'Bueno', value: 'Bueno' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Malo', value: 'Malo' },
    { label: 'Ausente', value: 'Ausente' }
  ];

  estadoAlumbradoOptions: SelectOption[] = [
    { label: 'Excelente', value: 'Excelente' },
    { label: 'Bueno', value: 'Bueno' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Malo', value: 'Malo' },
    { label: 'Ausente', value: 'Ausente' }
  ];

  serviciosPublicosList = [
    { nombre: 'acueducto', disponible: false },
    { nombre: 'alcantarillado', disponible: false },
    { nombre: 'energia electrica', disponible: false },
    { nombre: 'red telefonica', disponible: false },
    { nombre: 'gas natural', disponible: false }
  ];

  isServicioSelected(nombre: string): boolean {
    const serviciosControl = this.form.get('serviciosPublicos');
    if (serviciosControl && Array.isArray(serviciosControl.value)) {
      return serviciosControl.value.some((servicio: any) => servicio.nombre === nombre && servicio.disponible);
    }
    return false;
  }

  toggleServicio(nombre: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    const serviciosControl = this.form.get('serviciosPublicos');
    if (serviciosControl && Array.isArray(serviciosControl.value)) {
      const servicios = [...serviciosControl.value];
      const index = servicios.findIndex((servicio: any) => servicio.nombre === nombre);

      if (index !== -1) {
        servicios[index] = { ...servicios[index], disponible: checked };
      } else {
        servicios.push({ nombre, disponible: checked });
      }

      serviciosControl.setValue(servicios);
    }
  }

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

  onNext() {
    if (this.form.valid) {
      this.next.emit();
    }
  }
}