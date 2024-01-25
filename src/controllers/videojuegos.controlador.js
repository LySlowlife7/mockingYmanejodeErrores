//CAPA QUE TENDRA TODA LA LOGICA DE LAS RUTAS, RECIBIR LA PETICION DEL CLIENTE Y RESPONDERLE
//TRAER LA CAPA DE SERVICIOS
import { JuegosService } from "../service/videojuegos.servicio.js";

export class JuegosController{
    static getJuego = (req,res) => {
        const result = JuegosService.getJuego();
        res.json({status:"success", data:result});
    };

    static saveJuego = (req,res) => {
        const videojuegoInfo = req.body;
        const resut = JuegosService.saveJuego(videojuegoInfo);
        res.json({status:"success", data:result});
    };
};