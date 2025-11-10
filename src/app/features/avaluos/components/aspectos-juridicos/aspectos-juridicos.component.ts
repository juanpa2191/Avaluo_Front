import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SelectComponent, SelectOption } from '../../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../../shared/components/textarea/textarea.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aspectos-juridicos',
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
  templateUrl: './aspectos-juridicos.component.html',
  styleUrls: ['./aspectos-juridicos.component.css']
})
export class AspectosJuridicosComponent {
  @Input() form!: FormGroup;
  @Input() isEdit = false;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  modoAdquisicionOptions: SelectOption[] = [
    { label: 'Compra', value: 'Compra' },
    { label: 'Herencia', value: 'Herencia' },
    { label: 'Donación', value: 'Donación' },
    { label: 'Permuta', value: 'Permuta' },
    { label: 'Adjudicación', value: 'Adjudicación' },
    { label: 'Dación en Pago', value: 'Dación en Pago' },
    { label: 'Sucesión', value: 'Sucesión' },
    { label: 'Usucapión', value: 'Usucapión' },
    { label: 'Prescripción', value: 'Prescripción' }
  ];

  tipoInmuebleOptions: SelectOption[] = [
    { label: 'Casa', value: 'Casa' },
    { label: 'Apartamento', value: 'Apartamento' },
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

  regimenOptions: SelectOption[] = [
    { label: 'Propiedad horizontal', value: 'Propiedad horizontal' },
    { label: 'Propiedad raíz', value: 'Propiedad raíz' },
    { label: 'Condominio', value: 'Condominio' },
    { label: 'Copropiedad', value: 'Copropiedad' },
    { label: 'Propiedad privada', value: 'Propiedad privada' }
  ];

  zonaOptions: SelectOption[] = [
    { label: 'Residencial', value: 'Residencial' },
    { label: 'Comercial', value: 'Comercial' },
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Institucional', value: 'Institucional' },
    { label: 'Mixta', value: 'Mixta' },
    { label: 'Rural', value: 'Rural' }
  ];

  tipoIdentificacionOptions: SelectOption[] = [
    { label: 'Cédula de Ciudadanía', value: 'CC' },
    { label: 'Cédula de Extranjería', value: 'CE' },
    { label: 'Pasaporte', value: 'PA' },
    { label: 'NIT', value: 'NIT' },
    { label: 'Registro Civil', value: 'RC' }
  ];

  get propietarios(): FormArray {
    return this.form.get('propietarios') as FormArray;
  }

  agregarPropietario() {
    const propietarioForm = this.fb.group({
      propietario: ['', [Validators.required]],
      tipoIdentificacion: ['', [Validators.required]],
      numeroIdentificacion: ['', [Validators.required]]
    });
    this.propietarios.push(propietarioForm);
  }

  eliminarPropietario(index: number) {
    this.propietarios.removeAt(index);
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