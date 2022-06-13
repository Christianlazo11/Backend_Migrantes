import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Encuesta} from '../models';
import {EncuestaRepository} from './encuesta.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly encuestas: HasManyRepositoryFactory<Encuesta, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('EncuestaRepository') protected encuestaRepositoryGetter: Getter<EncuestaRepository>,
  ) {
    super(Usuario, dataSource);
    this.encuestas = this.createHasManyRepositoryFactoryFor('encuestas', encuestaRepositoryGetter,);
    this.registerInclusionResolver('encuestas', this.encuestas.inclusionResolver);
  }
}
