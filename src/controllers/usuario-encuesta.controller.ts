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
  Usuario,
  Encuesta,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioEncuestaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/encuestas', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Encuesta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Encuesta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Encuesta>,
  ): Promise<Encuesta[]> {
    return this.usuarioRepository.encuestas(id).find(filter);
  }

  @post('/usuarios/{id}/encuestas', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Encuesta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encuesta, {
            title: 'NewEncuestaInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) encuesta: Omit<Encuesta, 'id'>,
  ): Promise<Encuesta> {
    return this.usuarioRepository.encuestas(id).create(encuesta);
  }

  @patch('/usuarios/{id}/encuestas', {
    responses: {
      '200': {
        description: 'Usuario.Encuesta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encuesta, {partial: true}),
        },
      },
    })
    encuesta: Partial<Encuesta>,
    @param.query.object('where', getWhereSchemaFor(Encuesta)) where?: Where<Encuesta>,
  ): Promise<Count> {
    return this.usuarioRepository.encuestas(id).patch(encuesta, where);
  }

  @del('/usuarios/{id}/encuestas', {
    responses: {
      '200': {
        description: 'Usuario.Encuesta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Encuesta)) where?: Where<Encuesta>,
  ): Promise<Count> {
    return this.usuarioRepository.encuestas(id).delete(where);
  }
}
