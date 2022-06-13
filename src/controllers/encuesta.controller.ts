import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Encuesta} from '../models';
import {EncuestaRepository} from '../repositories';

export class EncuestaController {
  constructor(
    @repository(EncuestaRepository)
    public encuestaRepository : EncuestaRepository,
  ) {}

  @post('/encuestas')
  @response(200, {
    description: 'Encuesta model instance',
    content: {'application/json': {schema: getModelSchemaRef(Encuesta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encuesta, {
            title: 'NewEncuesta',
            exclude: ['id'],
          }),
        },
      },
    })
    encuesta: Omit<Encuesta, 'id'>,
  ): Promise<Encuesta> {
    return this.encuestaRepository.create(encuesta);
  }

  @get('/encuestas/count')
  @response(200, {
    description: 'Encuesta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Encuesta) where?: Where<Encuesta>,
  ): Promise<Count> {
    return this.encuestaRepository.count(where);
  }

  @get('/encuestas')
  @response(200, {
    description: 'Array of Encuesta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Encuesta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Encuesta) filter?: Filter<Encuesta>,
  ): Promise<Encuesta[]> {
    return this.encuestaRepository.find(filter);
  }

  @patch('/encuestas')
  @response(200, {
    description: 'Encuesta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encuesta, {partial: true}),
        },
      },
    })
    encuesta: Encuesta,
    @param.where(Encuesta) where?: Where<Encuesta>,
  ): Promise<Count> {
    return this.encuestaRepository.updateAll(encuesta, where);
  }

  @get('/encuestas/{id}')
  @response(200, {
    description: 'Encuesta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Encuesta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Encuesta, {exclude: 'where'}) filter?: FilterExcludingWhere<Encuesta>
  ): Promise<Encuesta> {
    return this.encuestaRepository.findById(id, filter);
  }

  @patch('/encuestas/{id}')
  @response(204, {
    description: 'Encuesta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encuesta, {partial: true}),
        },
      },
    })
    encuesta: Encuesta,
  ): Promise<void> {
    await this.encuestaRepository.updateById(id, encuesta);
  }

  @put('/encuestas/{id}')
  @response(204, {
    description: 'Encuesta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() encuesta: Encuesta,
  ): Promise<void> {
    await this.encuestaRepository.replaceById(id, encuesta);
  }

  @del('/encuestas/{id}')
  @response(204, {
    description: 'Encuesta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.encuestaRepository.deleteById(id);
  }
}
