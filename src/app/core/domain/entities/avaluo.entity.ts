export interface Avaluo {
  id?: string;
  informacionGeneral: {
    fechaEntrega: string;
    fechaVisita: string;
    vigenciaAvaluo: string;
    solicitante: string;
    departamento: string;
    municipio: string;
    barrioVereda: string;
    objetoAvaluo: string;
    destinoAvaluo: string;
    responsabilidadesAvaluador: string[];
  };
  aspectosJuridicos: {
    inmuebleObjetoAvaluo: {
      escrituraPublica: string;
      modoAdquisicion: string;
      matriculaInmobiliaria: string;
      fichaInmobiliaria: string;
      codigoCatastral: string;
    };
    propietarios: Array<{
      propietario: string;
      tipoIdentificacion: string;
      numeroIdentificacion: string;
    }>;
    tipoInmueble: {
      tipo: string;
      regimen: string;
      zona: string;
    };
    direccionYdestinacionEconomica: {
      direccion: string;
      destinacionEconomica: string;
      imagen: string;
      descripcion: string;
    };
    certificadoTradicionLibertad: {
      pin: string;
      fechaImpreso: string;
      horaImpresion: string;
      matriculaInmobiliaria: string;
      propietario: string;
    };
    escrituraPublica: {
      numero: string;
      fecha: string;
      matriculaInmobiliaria: string;
      propietario: string;
    };
    impuestoPredial: {
      periodoFacturado: string;
      fecha: string;
      matriculaFicha: string;
      codigoCatastral: string;
      direccion: string;
      propietario: string;
    };
    fachadas: {
      frontal: string;
      posterior: string;
      lateralIzquierda: string;
      lateralDerecha: string;
    };
  };
  caracteristicasGenerales: {
    formaGeometricaYdimensionDelPredio: {
      formaTerreno: string;
      anchoTerreno: number;
      largoTerreno: number;
      areaTerreno: number;
    };
    descripcionCondicionesSector: string;
    observaciones: string;
    estratoSocioeconomico: {
      descripcion: string;
      tablaEstratificacionNacional: string[];
    };
    entorno: string;
    viasPrincipales: {
      descripcion: string;
      acceso: {
        tipo: string;
        distancia: string;
      };
      imagen: string[];
      vias: string[];
    };
    transportePublico: {
      descripcion: string;
      tiposTransporte: {
        bus: string;
        metro: string;
        bicicleta: string;
      };
      frecuenciaOperacion: string;
      imagenes: string[];
    };
    serviciosPublicos: Array<{
      nombre: string;
      disponible: boolean;
    }>;
    infraestructuraEcologica: {
      descripcion: string;
      coberturaVegetal: string;
      fauna: string;
      hidrologia: string;
      usoSuelo: string;
      conservacionManejo: string;
      imagenes: string[];
    };
    viaAccesoPredio: {
      descripcion: string;
      observaciones: {
        viaAccesoPrincipal: string;
        viaSecundaria: string;
        tipoPavimento: string;
        estadoPavimento: string;
        andenes: string;
        estadoAndenes: string;
        alumbradoPublico: string;
        estadoAlumbradoPublico: string;
      };
      imagenes: string[];
    };
    perspectivasValoracion: string;
    actividadesSector: {
      usoPrincipal: string;
      usoComplementario: string;
      usoCondicionado: string;
      usoProhibido: string;
    };
  };
  inspeccionFisica: {
    esquemaNormativo: string;
    zonaBarrio: string;
    clasificacionSuelo: string;
    categoriaUso: string;
    subcategoriaUso: string;
    tratamiento: string;
    servidumbres: string;
    alturaMaxima: string;
    densidadHabitacionalMaxima: string;
    indiceOcupacion: string;
    espacioPublicoEquipamientos: string;
    areaMinimaLote: string;
    amenazaMovimientoMasa: string;
    especificacionesConstructivas: {
      especificacionConstructiva: Array<{
        tipo: string;
        identificacion: string;
        sistemaEstructural: string;
        tipoMamposteria: string;
        espesorMuros: string;
        cubierta: string;
      }>;
      observacion: string;
      acabados: Array<{
        tipo: string;
        identificacion: string;
        descripcion: string;
        acabadosYmateriales: string;
      }>;
      informacionConstruccion: string;
      distribucionInteriorApartamento: Array<{
        numeroInterior: string;
        tipo: string;
        descripcion: string[];
        cantidad: string[];
      }>;
    };
  };
  especificacionesInmueble: {
    caracteristicasEspecificas: string;
    estadoConservacion: string;
  };
  imagenesInmueble: Array<{
    tipoInmueble: string;
    identificacion: string;
    descripcion: string;
    tipoDistribucion: string;
    ruta: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateAvaluoDto extends Omit<Avaluo, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdateAvaluoDto extends Partial<Avaluo> {}