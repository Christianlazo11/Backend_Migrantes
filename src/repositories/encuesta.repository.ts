import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Encuesta, EncuestaRelations, Persona, Usuario} from '../models';
import {PersonaRepository} from './persona.repository';
import {UsuarioRepository} from './usuario.repository';

export class EncuestaRepository extends DefaultCrudRepository<
  Encuesta,
  typeof Encuesta.prototype.id,
  EncuestaRelations
> {

  public readonly personas: HasManyRepositoryFactory<Persona, typeof Encuesta.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Encuesta.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Encuesta, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.personas = this.createHasManyRepositoryFactoryFor('personas', personaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
