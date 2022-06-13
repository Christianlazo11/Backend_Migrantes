import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Encuesta,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaEncuestaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/encuesta', {
    responses: {
      '200': {
        description: 'Encuesta belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Encuesta)},
          },
        },
      },
    },
  })
  async getEncuesta(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Encuesta> {
    return this.personaRepository.encuesta(id);
  }
}
