import { Entity, model, property, belongsTo } from "@loopback/repository";
import { Encuesta } from "./encuesta.model";

@model()
export class Persona extends Entity {
  @property({
    type: "string",
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: "string",
    required: true,
  })
  nombre: string;

  @property({
    type: "string",
    required: true,
  })
  apellido: string;

  @property({
    type: "string",
    required: true,
  })
  documento: string;

  @property({
    type: "string",
    required: false,
  })
  genero: string;

  @property({
    type: "string",
    required: false,
  })
  nacionalidad: string;

  @property({
    type: "string",
    required: false,
  })
  fechaNac: string;

  @property({
    type: "string",
    required: false,
  })
  nivelEdu: string;

  @property({
    type: "string",
    required: false,
  })
  edad: number;

  @property({
    type: "string",
    required: false,
  })
  profesion: string;

  @property({
    type: "string",
    required: false,
  })
  tipo_emprendimiento: string;

  @property({
    type: "string",
    required: false,
  })
  act_economica: string;

  @property({
    type: "string",
    required: false,
  })
  tipo_act_economica: string;

  @property({
    type: "string",
    required: false,
  })
  runv: string;


  @property({
    type: "string",
    required: false,
  })
  estatus_migratorio: string;

  @property({
    type: "string",
    required: false,
  })
  afiliacion_salud: string;

  @property({
    type: "string",
    required: false,
  })
  docsSeleccionados: string;

  @property({
    type: "string",
    required: false,
  })
  discapacidad: string;

  @property({
    type: "string",
    required: false,
  })
  grupo_etnico: string;

  @property({
    type: "string",
    required: false,
  })
  movilidad_migratoria: string;


  @property({
    type: "string",
    required: false,
  })
  estudia: string;

  @property({
    type: "string",
    required: false,
  })
  grado: string;

  @property({
    type: "string",
    required: false,
  })
  parentezco: string;

  @belongsTo(() => Encuesta)
  encuestaId: string;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
