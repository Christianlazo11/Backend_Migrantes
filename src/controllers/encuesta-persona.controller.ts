import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Encuesta,
  Persona,
} from '../models';
import {EncuestaRepository} from '../repositories';

export class EncuestaPersonaController {
  constructor(
    @repository(EncuestaRepository) protected encuestaRepository: EncuestaRepository,
  ) { }

  @get('/encuestas/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of Encuesta has many Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.encuestaRepository.personas(id).find(filter);
  }

  @post('/encuestas/{id}/personas', {
    responses: {
      '200': {
        description: 'Encuesta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Encuesta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInEncuesta',
            exclude: ['id'],
            optional: ['encuestaId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.encuestaRepository.personas(id).create(persona);
  }

  @patch('/encuestas/{id}/personas', {
    responses: {
      '200': {
        description: 'Encuesta.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.encuestaRepository.personas(id).patch(persona, where);
  }

  @del('/encuestas/{id}/personas', {
    responses: {
      '200': {
        description: 'Encuesta.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.encuestaRepository.personas(id).delete(where);
  }
}
