import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Encuesta,
  Usuario,
} from '../models';
import {EncuestaRepository} from '../repositories';

export class EncuestaUsuarioController {
  constructor(
    @repository(EncuestaRepository)
    public encuestaRepository: EncuestaRepository,
  ) { }

  @get('/encuestas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Encuesta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Encuesta.prototype.id,
  ): Promise<Usuario> {
    return this.encuestaRepository.usuario(id);
  }
}
