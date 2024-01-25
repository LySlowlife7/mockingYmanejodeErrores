//TRAER LA CAPA DE PERSISTENCIA
import { videojuegosDao } from "../dao/index.js";

export class JuegosService{ //METODOS PARA ACCEDER A LAS FUNCIONES DE LA CARPETA DE MEMORIA
    static getJuegos(){ //FUNCION QUE BUSCA EN LA CAPA DE PERSISTENCIA, SON METODOS ESTATICOS
        return videojuegosDao.get();
    };

    static saveJuegos(videojuegos){
        return videojuegosDao.save(videojuegos);
    };
}

//ESTA CAPA ES DE INTERMEDIACION O DE CONEXION ENTRE RUTAS Y LA CAPA DE PERSISTENCIA