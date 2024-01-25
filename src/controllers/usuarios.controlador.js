import { UsuariosService } from "../service/usuarios.servicio.js";

export class UsuariosController{
    static getUsuario = (req,res) => {
        const result = UsuariosService.getUsuario();
        res.json({status:"success", data:result});
    };

    static saveUsuario = (req,res) => {
        const usuarioInfo = req.body;
        const resut = UsuariosService.saveUsuario(usuarioInfo);
        res.json({status:"success", data:result});
    };
};