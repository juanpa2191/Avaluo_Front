import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AvaluoService } from '../../../core/application/services/avaluo.service';
import { CreateAvaluoDto } from '../../../core/domain/entities/avaluo.entity';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { InformacionGeneralComponent } from '../components/informacion-general/informacion-general.component';
import { AspectosJuridicosComponent } from '../components/aspectos-juridicos/aspectos-juridicos.component';
import { CaracteristicasGeneralesComponent } from '../components/caracteristicas-generales/caracteristicas-generales.component';
import { InspeccionFisicaComponent } from '../components/inspeccion-fisica/inspeccion-fisica.component';
import { CommonModule } from '@angular/common';
import { SelectOption } from '../../../shared/components/select/select.component';

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
    InformacionGeneralComponent,
    AspectosJuridicosComponent,
    CaracteristicasGeneralesComponent,
    InspeccionFisicaComponent
  ],
  templateUrl: './crear-avaluo.component.html',
  styleUrls: ['./crear-avaluo.component.css']
})
export class CrearAvaluoComponent {
  avaluoForm: FormGroup;
  loading = false;
  activeTab = 0;

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

  tipoInmuebleOptions: SelectOption[] = [
    { label: 'Casa', value: 'Casa' },
    { label: 'Apartamento', value: 'Apartamento' },
    { label: 'Local Comercial', value: 'Local Comercial' },
    { label: 'Oficina', value: 'Oficina' },
    { label: 'Bodega', value: 'Bodega' },
    { label: 'Lote', value: 'Lote' }
  ];

  regimenOptions: SelectOption[] = [
    { label: 'Propiedad Horizontal', value: 'Propiedad Horizontal' },
    { label: 'Propiedad Individual', value: 'Propiedad Individual' },
    { label: 'Condominio', value: 'Condominio' }
  ];

  zonaOptions: SelectOption[] = [
    { label: 'Urbana', value: 'Urbana' },
    { label: 'Rural', value: 'Rural' },
    { label: 'Suburbana', value: 'Suburbana' }
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

  subcategoriaUsoOptions: SelectOption[] = [
    { label: 'Vivienda Unifamiliar', value: 'Vivienda Unifamiliar' },
    { label: 'Vivienda Multifamiliar', value: 'Vivienda Multifamiliar' },
    { label: 'Comercio Local', value: 'Comercio Local' },
    { label: 'Comercio Regional', value: 'Comercio Regional' },
    { label: 'Oficinas', value: 'Oficinas' },
    { label: 'Bodegas', value: 'Bodegas' }
  ];

  tratamientoOptions: SelectOption[] = [
    { label: 'Protección', value: 'Protección' },
    { label: 'Desarrollo', value: 'Desarrollo' },
    { label: 'Renovación', value: 'Renovación' },
    { label: 'Conservación', value: 'Conservación' }
  ];

  amenazaMovimientoMasaOptions: SelectOption[] = [
    { label: 'Baja', value: 'Baja' },
    { label: 'Media', value: 'Media' },
    { label: 'Alta', value: 'Alta' },
    { label: 'Muy Alta', value: 'Muy Alta' }
  ];

  estratoOptions: SelectOption[] = [
    { label: 'Estrato 1', value: '1' },
    { label: 'Estrato 2', value: '2' },
    { label: 'Estrato 3', value: '3' },
    { label: 'Estrato 4', value: '4' },
    { label: 'Estrato 5', value: '5' },
    { label: 'Estrato 6', value: '6' }
  ];

  entornoOptions: SelectOption[] = [
    { label: 'Urbano', value: 'Urbano' },
    { label: 'Suburbano', value: 'Suburbano' },
    { label: 'Rural', value: 'Rural' }
  ];

  usoPrincipalOptions: SelectOption[] = [
    { label: 'Residencial', value: 'Residencial' },
    { label: 'Comercial', value: 'Comercial' },
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Institucional', value: 'Institucional' }
  ];

  usoComplementarioOptions: SelectOption[] = [
    { label: 'Comercial', value: 'Comercial' },
    { label: 'Servicios', value: 'Servicios' },
    { label: 'Oficinas', value: 'Oficinas' },
    { label: 'Ninguno', value: 'Ninguno' }
  ];

  usoCondicionadoOptions: SelectOption[] = [
    { label: 'Equipamientos', value: 'Equipamientos' },
    { label: 'Espacios Públicos', value: 'Espacios Públicos' },
    { label: 'Ninguno', value: 'Ninguno' }
  ];

  constructor(
    private fb: FormBuilder,
    private avaluoService: AvaluoService,
    private router: Router
  ) {
    this.avaluoForm = this.fb.group({
      // Información General
      fechaInspeccion: ['', [Validators.required]],
      fechaInforme: ['', [Validators.required]],
      vigenciaInforme: ['', [Validators.required]],
      solicitante: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      barrioVereda: ['', [Validators.required]],
      objetoAvaluo: ['', [Validators.required]],
      destinoAvaluo: ['', [Validators.required]],
      responsabilidadesAvaluador: [[], [Validators.required, Validators.minLength(1)]],

      // Aspectos Jurídicos
      propietarios: this.fb.array([]),
      escrituraPublica: ['', [Validators.required]],
      modoAdquisicion: ['', [Validators.required]],
      matriculaInmobiliaria: ['', [Validators.required]],
      fichaInmobiliaria: ['', [Validators.required]],
      codigoCatastral: ['', [Validators.required]],
      tipoInmueble: ['', [Validators.required]],
      regimen: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      destinacionEconomica: ['', [Validators.required]],
      descripcionDireccion: [''],
      certificadoPin: [''],
      certificadoFechaImpreso: [''],
      certificadoHoraImpresion: [''],
      certificadoMatriculaInmobiliaria: [''],
      certificadoPropietario: [''],
      escrituraNumero: [''],
      escrituraFecha: [''],
      escrituraMatriculaInmobiliaria: [''],
      escrituraPropietario: [''],
      impuestoPeriodoFacturado: [''],
      impuestoFecha: [''],
      impuestoMatriculaFicha: [''],
      impuestoCodigoCatastral: [''],
      impuestoDireccion: [''],
      impuestoPropietario: [''],
      fachadaFrontal: [''],
      fachadaPosterior: [''],
      fachadaLateralIzquierda: [''],
      fachadaLateralDerecha: [''],

      // Características Generales
      formaTerreno: ['', [Validators.required]],
      anchoTerreno: ['', [Validators.required, Validators.min(0)]],
      largoTerreno: ['', [Validators.required, Validators.min(0)]],
      areaTerreno: ['', [Validators.required, Validators.min(0)]],
      descripcionCondicionesSector: ['', [Validators.required]],
      observaciones: [''],
      estratoSocioeconomico: ['', [Validators.required]],
      entorno: ['', [Validators.required]],
      perspectivasValoracion: [''],
      usoPrincipal: ['', [Validators.required]],
      usoComplementario: ['', [Validators.required]],
      usoCondicionado: ['', [Validators.required]],

      // Inspección Física
      esquemaNormativo: ['', [Validators.required]],
      zonaBarrio: ['', [Validators.required]],
      clasificacionSuelo: ['', [Validators.required]],
      categoriaUso: ['', [Validators.required]],
      subcategoriaUso: [''],
      tratamiento: [''],
      alturaMaxima: ['', [Validators.required]],
      densidadHabitacionalMaxima: [''],
      indiceOcupacion: [''],
      espacioPublicoEquipamientos: [''],
      areaMinimaLote: [''],
      amenazaMovimientoMasa: [''],
      servidumbres: [''],

      // Especificaciones del Inmueble
      caracteristicasEspecificas: [''],
      estadoConservacion: ['']
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
          fechaInspeccion: formValue.fechaInspeccion,
          fechaInforme: formValue.fechaInforme,
          vigenciaInforme: formValue.vigenciaInforme,
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
          propietarios: formValue.propietarios || [],
          tipoInmueble: {
            tipo: formValue.tipoInmueble,
            regimen: formValue.regimen,
            zona: formValue.zona
          },
          direccionYdestinacionEconomica: {
            direccion: formValue.direccion,
            destinacionEconomica: formValue.destinacionEconomica,
            imagen: '',
            descripcion: formValue.descripcionDireccion
          },
          certificadoTradicionLibertad: {
            pin: formValue.certificadoPin || '',
            fechaImpreso: formValue.certificadoFechaImpreso || '',
            horaImpresion: formValue.certificadoHoraImpresion || '',
            matriculaInmobiliaria: formValue.certificadoMatriculaInmobiliaria || '',
            propietario: formValue.certificadoPropietario || ''
          },
          escrituraPublica: {
            numero: formValue.escrituraNumero || '',
            fecha: formValue.escrituraFecha || '',
            matriculaInmobiliaria: formValue.escrituraMatriculaInmobiliaria || '',
            propietario: formValue.escrituraPropietario || ''
          },
          impuestoPredial: {
            periodoFacturado: formValue.impuestoPeriodoFacturado || '',
            fecha: formValue.impuestoFecha || '',
            matriculaFicha: formValue.impuestoMatriculaFicha || '',
            codigoCatastral: formValue.impuestoCodigoCatastral || '',
            direccion: formValue.impuestoDireccion || '',
            propietario: formValue.impuestoPropietario || ''
          },
          fachadas: {
            frontal: formValue.fachadaFrontal || '',
            posterior: formValue.fachadaPosterior || '',
            lateralIzquierda: formValue.fachadaLateralIzquierda || '',
            lateralDerecha: formValue.fachadaLateralDerecha || ''
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
            descripcion: formValue.estratoSocioeconomico,
            tablaEstratificacionNacional: []
          },
          entorno: formValue.entorno,
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
          perspectivasValoracion: formValue.perspectivasValoracion,
          actividadesSector: {
            usoPrincipal: formValue.usoPrincipal,
            usoComplementario: formValue.usoComplementario,
            usoCondicionado: formValue.usoCondicionado,
            usoProhibido: ''
          }
        },
        inspeccionFisica: {
          esquemaNormativo: formValue.esquemaNormativo,
          zonaBarrio: formValue.zonaBarrio,
          clasificacionSuelo: formValue.clasificacionSuelo,
          categoriaUso: formValue.categoriaUso,
          subcategoriaUso: formValue.subcategoriaUso,
          tratamiento: formValue.tratamiento,
          servidumbres: formValue.servidumbres,
          alturaMaxima: formValue.alturaMaxima,
          densidadHabitacionalMaxima: formValue.densidadHabitacionalMaxima,
          indiceOcupacion: formValue.indiceOcupacion,
          espacioPublicoEquipamientos: formValue.espacioPublicoEquipamientos,
          areaMinimaLote: formValue.areaMinimaLote,
          amenazaMovimientoMasa: formValue.amenazaMovimientoMasa,
          especificacionesConstructivas: {
            especificacionConstructiva: [],
            observacion: '',
            acabados: [],
            informacionConstruccion: '',
            distribucionInteriorApartamento: []
          }
        },
        especificacionesInmueble: {
          caracteristicasEspecificas: formValue.caracteristicasEspecificas,
          estadoConservacion: formValue.estadoConservacion
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

  onTabChange(index: number) {
    this.activeTab = index;
  }

  onNext() {
    if (this.activeTab < 3) {
      this.activeTab++;
    }
  }

  onPrevious() {
    if (this.activeTab > 0) {
      this.activeTab--;
    }
  }
}