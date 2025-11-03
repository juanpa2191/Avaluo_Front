import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AvaluoService } from '../../../core/application/services/avaluo.service';
import { CreateAvaluoDto } from '../../../core/domain/entities/avaluo.entity';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { SelectComponent, SelectOption } from '../../../shared/components/select/select.component';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-avaluo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    TabViewModule,
    SidebarComponent,
    InputComponent,
    TextareaComponent,
    SelectComponent,
    MultiSelectComponent,
    ButtonComponent
  ],
  templateUrl: './crear-avaluo.component.html',
  styleUrls: ['./crear-avaluo.component.css']
})
export class CrearAvaluoComponent {
  avaluoForm: FormGroup;
  loading = false;

  // Opciones para selects
  departamentosOptions: SelectOption[] = [
    { label: 'Cundinamarca', value: 'Cundinamarca' },
    { label: 'Antioquia', value: 'Antioquia' },
    { label: 'Valle del Cauca', value: 'Valle del Cauca' },
    { label: 'Santander', value: 'Santander' }
  ];

  objetoAvaluoOptions: SelectOption[] = [
    { label: 'Apartamento', value: 'Apartamento' },
    { label: 'Casa', value: 'Casa' },
    { label: 'Local Comercial', value: 'Local Comercial' },
    { label: 'Oficina', value: 'Oficina' },
    { label: 'Bodega', value: 'Bodega' },
    { label: 'Lote', value: 'Lote' }
  ];

  destinoAvaluoOptions: SelectOption[] = [
    { label: 'Venta', value: 'Venta' },
    { label: 'Hipoteca', value: 'Hipoteca' },
    { label: 'Remate', value: 'Remate' },
    { label: 'Dación en Pago', value: 'Dación en Pago' },
    { label: 'Avalúo Judicial', value: 'Avalúo Judicial' }
  ];

  responsabilidadesOptions: SelectOption[] = [
    { label: 'Evaluación física del inmueble', value: 'Evaluación física del inmueble' },
    { label: 'Análisis de mercado inmobiliario', value: 'Análisis de mercado inmobiliario' },
    { label: 'Valoración comparativa', value: 'Valoración comparativa' },
    { label: 'Análisis de títulos', value: 'Análisis de títulos' },
    { label: 'Informe técnico', value: 'Informe técnico' }
  ];

  modoAdquisicionOptions: SelectOption[] = [
    { label: 'Compra', value: 'Compra' },
    { label: 'Herencia', value: 'Herencia' },
    { label: 'Donación', value: 'Donación' },
    { label: 'Permuta', value: 'Permuta' },
    { label: 'Adjudicación', value: 'Adjudicación' }
  ];

  formaTerrenoOptions: SelectOption[] = [
    { label: 'Rectangular', value: 'Rectangular' },
    { label: 'Cuadrado', value: 'Cuadrado' },
    { label: 'Irregular', value: 'Irregular' },
    { label: 'Triangular', value: 'Triangular' }
  ];

  clasificacionSueloOptions: SelectOption[] = [
    { label: 'Urbano', value: 'Urbano' },
    { label: 'Rural', value: 'Rural' },
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Comercial', value: 'Comercial' }
  ];

  categoriaUsoOptions: SelectOption[] = [
    { label: 'Residencial', value: 'Residencial' },
    { label: 'Comercial', value: 'Comercial' },
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Institucional', value: 'Institucional' }
  ];

  constructor(
    private fb: FormBuilder,
    private avaluoService: AvaluoService,
    private router: Router
  ) {
    this.avaluoForm = this.fb.group({
      // Información General
      fechaEntrega: ['', [Validators.required]],
      fechaVisita: ['', [Validators.required]],
      vigenciaAvaluo: ['', [Validators.required]],
      solicitante: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      barrioVereda: ['', [Validators.required]],
      objetoAvaluo: ['', [Validators.required]],
      destinoAvaluo: ['', [Validators.required]],
      responsabilidadesAvaluador: [[], [Validators.required, Validators.minLength(1)]],

      // Aspectos Jurídicos
      escrituraPublica: ['', [Validators.required]],
      modoAdquisicion: ['', [Validators.required]],
      matriculaInmobiliaria: ['', [Validators.required]],
      fichaInmobiliaria: ['', [Validators.required]],
      codigoCatastral: ['', [Validators.required]],

      // Características Generales
      formaTerreno: ['', [Validators.required]],
      anchoTerreno: ['', [Validators.required, Validators.min(0)]],
      largoTerreno: ['', [Validators.required, Validators.min(0)]],
      areaTerreno: ['', [Validators.required, Validators.min(0)]],
      descripcionCondicionesSector: ['', [Validators.required]],
      observaciones: [''],

      // Inspección Física
      esquemaNormativo: ['', [Validators.required]],
      zonaBarrio: ['', [Validators.required]],
      clasificacionSuelo: ['', [Validators.required]],
      categoriaUso: ['', [Validators.required]],
      alturaMaxima: ['', [Validators.required]]
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.avaluoForm.get(fieldName);
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

  onSubmit() {
    if (this.avaluoForm.valid) {
      this.loading = true;

      const formValue = this.avaluoForm.value;
      const avaluoData: CreateAvaluoDto = {
        informacionGeneral: {
          fechaEntrega: formValue.fechaEntrega,
          fechaVisita: formValue.fechaVisita,
          vigenciaAvaluo: formValue.vigenciaAvaluo,
          solicitante: formValue.solicitante,
          departamento: formValue.departamento,
          municipio: formValue.municipio,
          barrioVereda: formValue.barrioVereda,
          objetoAvaluo: formValue.objetoAvaluo,
          destinoAvaluo: formValue.destinoAvaluo,
          responsabilidadesAvaluador: formValue.responsabilidadesAvaluador
        },
        aspectosJuridicos: {
          inmuebleObjetoAvaluo: {
            escrituraPublica: formValue.escrituraPublica,
            modoAdquisicion: formValue.modoAdquisicion,
            matriculaInmobiliaria: formValue.matriculaInmobiliaria,
            fichaInmobiliaria: formValue.fichaInmobiliaria,
            codigoCatastral: formValue.codigoCatastral
          },
          propietarios: [],
          tipoInmueble: {
            tipo: '',
            regimen: '',
            zona: ''
          },
          direccionYdestinacionEconomica: {
            direccion: '',
            destinacionEconomica: '',
            imagen: '',
            descripcion: ''
          },
          certificadoTradicionLibertad: {
            pin: '',
            fechaImpreso: '',
            horaImpresion: '',
            matriculaInmobiliaria: '',
            propietario: ''
          },
          escrituraPublica: {
            numero: '',
            fecha: '',
            matriculaInmobiliaria: '',
            propietario: ''
          },
          impuestoPredial: {
            periodoFacturado: '',
            fecha: '',
            matriculaFicha: '',
            codigoCatastral: '',
            direccion: '',
            propietario: ''
          },
          fachadas: {
            frontal: '',
            posterior: '',
            lateralIzquierda: '',
            lateralDerecha: ''
          }
        },
        caracteristicasGenerales: {
          formaGeometricaYdimensionDelPredio: {
            formaTerreno: formValue.formaTerreno,
            anchoTerreno: parseFloat(formValue.anchoTerreno),
            largoTerreno: parseFloat(formValue.largoTerreno),
            areaTerreno: parseFloat(formValue.areaTerreno)
          },
          descripcionCondicionesSector: formValue.descripcionCondicionesSector,
          observaciones: formValue.observaciones,
          estratoSocioeconomico: {
            descripcion: '',
            tablaEstratificacionNacional: []
          },
          entorno: '',
          viasPrincipales: {
            descripcion: '',
            acceso: {
              tipo: '',
              distancia: ''
            },
            imagen: [],
            vias: []
          },
          transportePublico: {
            descripcion: '',
            tiposTransporte: {
              bus: '',
              metro: '',
              bicicleta: ''
            },
            frecuenciaOperacion: '',
            imagenes: []
          },
          serviciosPublicos: [],
          infraestructuraEcologica: {
            descripcion: '',
            coberturaVegetal: '',
            fauna: '',
            hidrologia: '',
            usoSuelo: '',
            conservacionManejo: '',
            imagenes: []
          },
          viaAccesoPredio: {
            descripcion: '',
            observaciones: {
              viaAccesoPrincipal: '',
              viaSecundaria: '',
              tipoPavimento: '',
              estadoPavimento: '',
              andenes: '',
              estadoAndenes: '',
              alumbradoPublico: '',
              estadoAlumbradoPublico: ''
            },
            imagenes: []
          },
          perspectivasValoracion: '',
          actividadesSector: {
            usoPrincipal: '',
            usoComplementario: '',
            usoCondicionado: '',
            usoProhibido: ''
          }
        },
        inspeccionFisica: {
          esquemaNormativo: formValue.esquemaNormativo,
          zonaBarrio: formValue.zonaBarrio,
          clasificacionSuelo: formValue.clasificacionSuelo,
          categoriaUso: formValue.categoriaUso,
          subcategoriaUso: '',
          tratamiento: '',
          servidumbres: '',
          alturaMaxima: formValue.alturaMaxima,
          densidadHabitacionalMaxima: '',
          indiceOcupacion: '',
          espacioPublicoEquipamientos: '',
          areaMinimaLote: '',
          amenazaMovimientoMasa: '',
          especificacionesConstructivas: {
            especificacionConstructiva: [],
            observacion: '',
            acabados: [],
            informacionConstruccion: '',
            distribucionInteriorApartamento: []
          }
        },
        especificacionesInmueble: {
          caracteristicasEspecificas: '',
          estadoConservacion: ''
        },
        imagenesInmueble: []
      };

      this.avaluoService.createAvaluo(avaluoData).subscribe({
        next: () => {
          this.router.navigate(['/avaluos']);
        },
        error: (error) => {
          console.error('Error creating avaluo:', error);
          this.loading = false;
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/avaluos']);
  }
}