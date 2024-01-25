import { Router } from "express";
//TRAER LA CAPA DEL CONTROLADOR
import { JuegosController } from "../controller/videojuegos.controlador.js";

const router = Router();

//FUNCION PARA VER LOS JUEGOS
router.get("/", JuegosController.getJuego);
//FUNCION PARA AGREGAR ESCRIBIR JUEGOS
router.post("/", JuegosController.saveJuego);

export {router as juegosRouter}