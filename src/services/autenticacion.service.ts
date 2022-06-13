import { /* inject, */ BindingScope, injectable } from "@loopback/core";
import { repository } from "@loopback/repository";
import { Llaves } from "../config/Llaves";
import { Usuario } from "../models/usuario.model";
import { PersonaRepository, UsuarioRepository } from "../repositories";
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({ scope: BindingScope.TRANSIENT })
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */

  GenerarClave() {
    const clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarPersona(documento: string) {
    try {
      const p = this.personaRepository.findOne({
        where: { documento: documento },
      });
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  IdentificarUsuario(usuario: string, clave: string) {
    try {
      const p = this.usuarioRepository.findOne({
        where: { correo: usuario, clave: clave },
      });
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(usuario: Usuario) {
    const token = jwt.sign(
      {
        data: {
          id: usuario.id,
          correo: usuario.correo,
          nombres: usuario.nombre + " " + usuario.apellido,
          rol: usuario.rol,
        },
      },
      Llaves.claveJWT
    );
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      const datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
