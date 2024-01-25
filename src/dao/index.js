import { JuegosMemory } from "./managers/memory/videojuegos.memoria.js";
import { UsuariosMemory } from "./managers/memory/usuarios.memoria.js";

export const videojuegosDao = new JuegosMemory;
export const UsuariosDao = new UsuariosMemory;