//TRAER LA CAPA DE PERSISTENCIA
import { UsuariosDao } from "../dao/index.js";

export class UsuariosService{ //METODOS PARA ACCEDER A LAS FUNCIONES DE LA CARPETA DE MEMORIA
    static getUsuario(){ //FUNCION QUE BUSCA EN LA CAPA DE PERSISTENCIA, SON METODOS ESTATICOS
        return UsuariosDao.get();
    };

    static saveUsuario(usuarios){
        return UsuariosDao.save(usuarios);
    };
}