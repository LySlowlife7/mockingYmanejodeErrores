import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";

export const sessionsRouter = Router();

// Rutas Registros
sessionsRouter.post("/signup", passport.authenticate("signupLocalStrategy",{
    failureRedirect:"/api/sessions/fail-signup"
}) , async(req,res)=>{
    res.render("loginView",{message:"Usuario registrado correctamente"});
});

sessionsRouter.get("/fail-signup",(req,res)=>{
    res.render("signupView", {error:"No se pudo registrar el usuario"});
});

// Ruta Solicitud Registro GitHub
sessionsRouter.get("/signup-github", passport.authenticate("signupGithubStrategy"));

// Ruta Callback Github
sessionsRouter.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy", {
    failureRedirect: "/api/sessions/fail-signup"
}), (req, res) => {
    res.redirect("/profile")
});

// Rutas Login
sessionsRouter.post("/login", passport.authenticate("loginLocalStrategy",{
    failureRedirect:"/api/sessions/fail-login"
}) , async(req,res)=>{
    res.redirect("/profile");
});

sessionsRouter.get("/fail-login",(req,res)=>{
    res.render("loginView",{error:"No se pudo iniciar sesion para este usuario"});
});

// Ruta Logout
sessionsRouter.get("/logout", async(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err) return res.render("profileView",{error:"No se pudo cerrar la sesion"});
            res.redirect("/");
        })
    } catch (error) {
        res.render("signupView",{error:"No se pudo registrar el usuario"});
    }
});