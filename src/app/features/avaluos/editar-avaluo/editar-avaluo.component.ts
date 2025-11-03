import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvaluoService } from '../../../core/application/services/avaluo.service';
import { Avaluo, UpdateAvaluoDto } from '../../../core/domain/entities/avaluo.entity';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { InformacionGeneralComponent } from '../components/informacion-general/informacion-general.component';
import { AspectosJuridicosComponent } from '../components/aspectos-juridicos/aspectos-juridicos.component';
import { CaracteristicasGeneralesComponent } from '../components/caracteristicas-generales/caracteristicas-generales.component';
import { InspeccionFisicaComponent } from '../components/inspeccion-fisica/inspeccion-fisica.component';
import { SelectOption } from '../../../shared/components/select/select.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-avaluo',
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
  templateUrl: './editar-avaluo.component.html',
  styleUrls: ['./editar-avaluo.component.css']
})
export class EditarAvaluoComponent implements OnInit {
  avaluoForm: FormGroup;
  loading = true;
  updating = false;
  activeTab = 0;
  avaluoId: string = '';
  avaluo: Avaluo | null = null;

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
    private router: Router,
    private route: ActivatedRoute
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
      tipoInmueble: ['', [Validators.required]],
      regimen: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      destinacionEconomica: ['', [Validators.required]],
      descripcionDireccion: [''],

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
      usoComplementario: [''],
      usoCondicionado: [''],

      // Inspección Física
      esquemaNormativo: ['', [Validators.required]],
      zonaBarrio: ['', [Validators.required]],
      clasificacionSuelo: ['', [Validators.required]],
      categoriaUso: ['', [Validators.required]],
      subcategoriaUso: [''],
      tratamiento: [''],
      servidumbres: [''],
      alturaMaxima: ['', [Validators.required]],
      densidadHabitacionalMaxima: [''],
      indiceOcupacion: [''],
      areaMinimaLote: [''],
      amenazaMovimientoMasa: [''],
      caracteristicasEspecificas: [''],
      estadoConservacion: ['']
    });
  }

  ngOnInit() {
    this.avaluoId = this.route.snapshot.params['id'];
    this.loadAvaluo();
  }

  loadAvaluo() {
    this.avaluoService.getAvaluoById(this.avaluoId).subscribe({
      next: (avaluo) => {
        this.avaluo = avaluo;
        this.populateForm(avaluo);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading avaluo:', error);
        this.loading = false;
      }
    });
  }

  populateForm(avaluo: Avaluo) {
    this.avaluoForm.patchValue({
      // Información General
      fechaEntrega: avaluo.informacionGeneral.fechaEntrega,
      fechaVisita: avaluo.informacionGeneral.fechaVisita,
      vigenciaAvaluo: avaluo.informacionGeneral.vigenciaAvaluo,
      solicitante: avaluo.informacionGeneral.solicitante,
      departamento: avaluo.informacionGeneral.departamento,
      municipio: avaluo.informacionGeneral.municipio,
      barrioVereda: avaluo.informacionGeneral.barrioVereda,
      objetoAvaluo: avaluo.informacionGeneral.objetoAvaluo,
      destinoAvaluo: avaluo.informacionGeneral.destinoAvaluo,
      responsabilidadesAvaluador: avaluo.informacionGeneral.responsabilidadesAvaluador,

      // Aspectos Jurídicos
      escrituraPublica: avaluo.aspectosJuridicos.inmuebleObjetoAvaluo.escrituraPublica,
      modoAdquisicion: avaluo.aspectosJuridicos.inmuebleObjetoAvaluo.modoAdquisicion,
      matriculaInmobiliaria: avaluo.aspectosJuridicos.inmuebleObjetoAvaluo.matriculaInmobiliaria,
      fichaInmobiliaria: avaluo.aspectosJuridicos.inmuebleObjetoAvaluo.fichaInmobiliaria,
      codigoCatastral: avaluo.aspectosJuridicos.inmuebleObjetoAvaluo.codigoCatastral,
      tipoInmueble: avaluo.aspectosJuridicos.tipoInmueble?.tipo || '',
      regimen: avaluo.aspectosJuridicos.tipoInmueble?.regimen || '',
      zona: avaluo.aspectosJuridicos.tipoInmueble?.zona || '',
      direccion: avaluo.aspectosJuridicos.direccionYdestinacionEconomica?.direccion || '',
      destinacionEconomica: avaluo.aspectosJuridicos.direccionYdestinacionEconomica?.destinacionEconomica || '',
      descripcionDireccion: avaluo.aspectosJuridicos.direccionYdestinacionEconomica?.descripcion || '',

      // Características Generales
      formaTerreno: avaluo.caracteristicasGenerales.formaGeometricaYdimensionDelPredio.formaTerreno,
      anchoTerreno: avaluo.caracteristicasGenerales.formaGeometricaYdimensionDelPredio.anchoTerreno.toString(),
      largoTerreno: avaluo.caracteristicasGenerales.formaGeometricaYdimensionDelPredio.largoTerreno.toString(),
      areaTerreno: avaluo.caracteristicasGenerales.formaGeometricaYdimensionDelPredio.areaTerreno.toString(),
      descripcionCondicionesSector: avaluo.caracteristicasGenerales.descripcionCondicionesSector,
      observaciones: avaluo.caracteristicasGenerales.observaciones,
      estratoSocioeconomico: avaluo.caracteristicasGenerales.estratoSocioeconomico?.descripcion || '',
      entorno: avaluo.caracteristicasGenerales.entorno || '',
      perspectivasValoracion: avaluo.caracteristicasGenerales.perspectivasValoracion || '',
      usoPrincipal: avaluo.caracteristicasGenerales.actividadesSector?.usoPrincipal || '',
      usoComplementario: avaluo.caracteristicasGenerales.actividadesSector?.usoComplementario || '',
      usoCondicionado: avaluo.caracteristicasGenerales.actividadesSector?.usoCondicionado || '',

      // Inspección Física
      esquemaNormativo: avaluo.inspeccionFisica.esquemaNormativo,
      zonaBarrio: avaluo.inspeccionFisica.zonaBarrio,
      clasificacionSuelo: avaluo.inspeccionFisica.clasificacionSuelo,
      categoriaUso: avaluo.inspeccionFisica.categoriaUso,
      subcategoriaUso: avaluo.inspeccionFisica.subcategoriaUso || '',
      tratamiento: avaluo.inspeccionFisica.tratamiento || '',
      servidumbres: avaluo.inspeccionFisica.servidumbres || '',
      alturaMaxima: avaluo.inspeccionFisica.alturaMaxima,
      densidadHabitacionalMaxima: avaluo.inspeccionFisica.densidadHabitacionalMaxima || '',
      indiceOcupacion: avaluo.inspeccionFisica.indiceOcupacion || '',
      areaMinimaLote: avaluo.inspeccionFisica.areaMinimaLote || '',
      amenazaMovimientoMasa: avaluo.inspeccionFisica.amenazaMovimientoMasa || '',
      caracteristicasEspecificas: avaluo.especificacionesInmueble?.caracteristicasEspecificas || '',
      estadoConservacion: avaluo.especificacionesInmueble?.estadoConservacion || ''
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

  // Función auxiliar para remover propiedades _id de objetos
  private removeIds(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) {
      return obj.map(item => this.removeIds(item));
    }

    const cleanedObj: any = {};
    for (const key in obj) {
      if (key !== '_id' && key !== 'property') {
        cleanedObj[key] = this.removeIds(obj[key]);
      }
    }
    return cleanedObj;
  }

  onSubmit() {
    if (this.avaluoForm.valid && this.avaluoForm.dirty) {
      this.updating = true;

      const formValue = this.avaluoForm.value;
      const avaluoData: UpdateAvaluoDto = {
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
          propietarios: this.removeIds(this.avaluo?.aspectosJuridicos.propietarios) || [],
          tipoInmueble: {
            tipo: formValue.tipoInmueble,
            regimen: formValue.regimen,
            zona: formValue.zona
          },
          direccionYdestinacionEconomica: {
            direccion: formValue.direccion,
            destinacionEconomica: formValue.destinacionEconomica,
            imagen: this.avaluo?.aspectosJuridicos.direccionYdestinacionEconomica?.imagen || '',
            descripcion: formValue.descripcionDireccion
          },
          certificadoTradicionLibertad: this.removeIds(this.avaluo?.aspectosJuridicos.certificadoTradicionLibertad) || {
            pin: '',
            fechaImpreso: '',
            horaImpresion: '',
            matriculaInmobiliaria: '',
            propietario: ''
          },
          escrituraPublica: this.removeIds(this.avaluo?.aspectosJuridicos.escrituraPublica) || {
            numero: '',
            fecha: '',
            matriculaInmobiliaria: '',
            propietario: ''
          },
          impuestoPredial: this.removeIds(this.avaluo?.aspectosJuridicos.impuestoPredial) || {
            periodoFacturado: '',
            fecha: '',
            matriculaFicha: '',
            codigoCatastral: '',
            direccion: '',
            propietario: ''
          },
          fachadas: this.removeIds(this.avaluo?.aspectosJuridicos.fachadas) || {
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
            descripcion: formValue.estratoSocioeconomico,
            tablaEstratificacionNacional: this.removeIds(this.avaluo?.caracteristicasGenerales.estratoSocioeconomico?.tablaEstratificacionNacional) || []
          },
          entorno: formValue.entorno,
          viasPrincipales: this.removeIds(this.avaluo?.caracteristicasGenerales.viasPrincipales) || {
            descripcion: '',
            acceso: {
              tipo: '',
              distancia: ''
            },
            imagen: [],
            vias: []
          },
          transportePublico: this.removeIds(this.avaluo?.caracteristicasGenerales.transportePublico) || {
            descripcion: '',
            tiposTransporte: {
              bus: '',
              metro: '',
              bicicleta: ''
            },
            frecuenciaOperacion: '',
            imagenes: []
          },
          serviciosPublicos: this.removeIds(this.avaluo?.caracteristicasGenerales.serviciosPublicos) || [],
          infraestructuraEcologica: this.removeIds(this.avaluo?.caracteristicasGenerales.infraestructuraEcologica) || {
            descripcion: '',
            coberturaVegetal: '',
            fauna: '',
            hidrologia: '',
            usoSuelo: '',
            conservacionManejo: '',
            imagenes: []
          },
          viaAccesoPredio: this.removeIds(this.avaluo?.caracteristicasGenerales.viaAccesoPredio) || {
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
            usoProhibido: this.avaluo?.caracteristicasGenerales.actividadesSector?.usoProhibido || ''
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
          espacioPublicoEquipamientos: this.avaluo?.inspeccionFisica.espacioPublicoEquipamientos || '',
          areaMinimaLote: formValue.areaMinimaLote,
          amenazaMovimientoMasa: formValue.amenazaMovimientoMasa,
          especificacionesConstructivas: this.removeIds(this.avaluo?.inspeccionFisica.especificacionesConstructivas) || {
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
        imagenesInmueble: this.removeIds(this.avaluo?.imagenesInmueble) || []
      };

      this.avaluoService.updateAvaluo(this.avaluoId, avaluoData).subscribe({
        next: () => {
          this.router.navigate(['/avaluos']);
        },
        error: (error) => {
          console.error('Error updating avaluo:', error);
          this.updating = false;
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