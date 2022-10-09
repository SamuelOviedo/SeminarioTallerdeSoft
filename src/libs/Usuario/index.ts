import { getConnection } from "@models/sqlite/SqliteConn";
import { UsuarioDao } from "@models/sqlite/UsuarioDao";

export interface IUsuario {
    IdNumber: String;
    name: string;
    lastname: string;
    direction: string;
    age: number;
    cellphone: number;
  };

export class Usuario {

  private dao: UsuarioDao;

  public constructor() {
    getConnection()
    .then(conn=>{
      this.dao = new UsuarioDao(conn);
    })
    .catch(ex=>console.error(ex));
  }

  // Consultas
  public getAllUsuario() {
    return this.dao.getUsuarios();
  }
  public getUsuarioByIndex( index:number) {
      return this.dao.getUsuarioById({_id:index});
  }

  public addUsuario( usuario:IUsuario) {
    return this.dao.insertNewUsuario(usuario);
  }
  public updateUsuario( index:number, usuario:IUsuario){
   return this.dao.update({_id:index}, usuario);
  }
  public deleteUsuario( index:number) {
    return this.dao.deleteUsuario({_id:index});
  }

}

