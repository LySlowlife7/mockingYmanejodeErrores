import { Router } from "express";
//TRAER LA CAPA DEL CONTROLADOR
import { UsuariosController } from "../controller/usuarios.controlador.js";

const router = Router();

//FUNCION PARA VER LOS JUEGOS
router.get("/", UsuariosController.getUsuario);
//FUNCION PARA AGREGAR ESCRIBIR JUEGOS
router.post("/", UsuariosController.saveUsuario);

export {router as usuariosRouter}