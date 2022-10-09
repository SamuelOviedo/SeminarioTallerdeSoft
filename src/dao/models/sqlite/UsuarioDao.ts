import { IUsuario } from "../entities/Usuario";
import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';

export class UsuarioDao extends AbstractDao<IUsuario> {

    public constructor(db: sqlite.Database) {
        super('USUARIO', db as sqlite.Database);
        super.exec('CREATE TABLE IF NOT EXISTS USUARIO ('
            + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
            + ' IdNumber TEXT,'
            + ' name TEXT,'
            + ' lastname TEXT,'
            + ' direction TEXT,'
            + ' age NUMERIC,'
            + ' cellphone NUMERIC);').then().catch(e => console.error(e));
    }

    public async getUsuarios() {
        return super.findAll()
    }

    public async getUsuarioById(identifier: Partial<IUsuario>) {
        try {
            const result = await super.findByID(identifier);
            return result;
        } catch (ex: unknown) {
            console.log("UsuarioDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async insertNewUsuario(newUsuario: IUsuario) {
        try {
            const result = await super.createOne(newUsuario);
            return result;
        } catch (ex: unknown) {
            console.log("UsuarioDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async updateNewUsuario(updateUsuario: IUsuario) {
        try {
            const { _id, ...updateObject } = updateUsuario;
            const result = await super.update({ _id }, updateObject);
            return result;

        } catch (ex: unknown) {
            console.log("UsuarioDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async deleteUsuario(deleteUsuario: Partial<IUsuario>) {
        try {
            const { _id } = deleteUsuario;
            const result = await super.delete({ _id });
            return result;
        } catch (ex: unknown) {
            console.log("UsuarioDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

}