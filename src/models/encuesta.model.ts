import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';
import {Usuario} from './usuario.model';

@model()
export class Encuesta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  no_encuesta: string;

  @property({
    type: 'string',
    required: false,
  })
  municipio: string;

  @property({
    type: 'string',
    required: false,
  })
  direccion: string;

  @property({
    type: 'string',
    required: false,
  })
  correo: string;

  @property({
    type: 'string',
    required: false,
  })
  fijo_cel: string;

  @property({
    type: 'string',
    required: false,
  })
  est_civil: string;

  @property({
    type: 'string',
    required: false,
  })
  info_nucleo: string;

  @property({
    type: 'string',
    required: false,
  })
  conf_hogar: string;

  @property({
    type: 'string',
    required: false,
  })
  quedaron_hijos: string;

  @property({
    type: 'string',
    required: false,
  })
  nacionalidad_pareja: string;

  @property({
    type: 'string',
    required: false,
  })
  razon_cruce: string;

  @property({
    type: 'string',
    required: false,
  })
  tiempo_estancia: string;

  @property({
    type: 'string',
    required: false,
  })
  razon_arauca: string;

  @property({
    type: 'string',
    required: false,
  })
  intencion: string;

  @property({
    type: 'string',
    required: false,
  })
  intencion_permanecer: string;

  @property({
    type: 'string',
    required: false,
  })
  localidad_procedencia: string;

  @property({
    type: 'string',
    required: false,
  })
  maternidad: string;
  
  @property({
    type: 'string',
    required: false,
  })
  apostillo_tit_bachiller: string;

  @property({
    type: 'string',
    required: false,
  })
  apostillo_tit_tec: string;

  @property({
    type: 'string',
    required: false,
  })
  apostillo_tit_profesional: string;

  @property({
    type: 'string',
    required: false,
  })
  apostillo_otro_titulo: string;

  @property({
    type: 'string',
    required: false,
  })
  lugar_trabajo: string;

  @property({
    type: 'string',
    required: false,
  })
  posicion_trabajo: string;

  @property({
    type: 'string',
    required: false,
  })
  tipo_vinculacion: string;

  @property({
    type: 'string',
    required: false,
  })
  obtener_ingresos: string;

  @property({
    type: 'string',
    required: false,
  })
  ingresos_mensuales: string;

  @property({
    type: 'string',
    required: false,
  })
  invierte_salario: string;

  @property({
    type: 'string',
    required: false,
  })
  intencion_tiempo_estancia: string;

  @property({
    type: 'string',
    required: false,
  })
  interes_salud_publica: string;

  @property({
    type: 'string',
    required: false,
  })
  institucion_cubrio_gastos: string;

  @property({
    type: 'string',
    required: false,
  })
  servicios_institucionales: string;

  @property({
    type: 'string', 
    required: false,
  })
  miselect: string;

  @property({
    type: 'string', 
    required: false,
  })
  clase_vivienda: string;

  @property({
    type: 'string', 
    required: false,
  })
  tipo_vivienda: string;

  @property({
    type: 'string', 
    required: false,
  })
  causal_de_retorno: string;

  @property({
    type: 'string', 
    required: false,
  })
  años_estancia_vzla: string;

  @property({
    type: 'string', 
    required: false,
  })
  tipo_necesidad_basica: string;

  @property({
    type: 'string', 
    required: false,
  })
  tipo_ayuda_recibida_IE: string;

  @property({
    type: 'string', 
    required: false,
  })
  tipo_ayuda_recibida_CI: string;

  @property({
    type: 'string', 
    required: false,
  })
  situa_especial_retornado: string;

  @property({
    type: 'string', 
    required: false,
  })
  ajuste_socio_demo_vene: string;

 
  // Personas
  
  @hasMany(() => Persona)
  personas: Persona[];

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Encuesta>) {
    super(data);
  }
}

export interface EncuestaRelations {
  // describe navigational properties here
}

export type EncuestaWithRelations = Encuesta & EncuestaRelations;
