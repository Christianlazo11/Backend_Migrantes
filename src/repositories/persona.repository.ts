import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Persona, PersonaRelations, Encuesta} from '../models';
import {EncuestaRepository} from './encuesta.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly encuesta: BelongsToAccessor<Encuesta, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('EncuestaRepository') protected encuestaRepositoryGetter: Getter<EncuestaRepository>,
  ) {
    super(Persona, dataSource);
    this.encuesta = this.createBelongsToAccessorFor('encuesta', encuestaRepositoryGetter,);
    this.registerInclusionResolver('encuesta', this.encuesta.inclusionResolver);
  }
}
