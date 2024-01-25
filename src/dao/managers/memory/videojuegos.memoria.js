const videojuegos = [];

export class JuegosMemory{
    get(){
        return videojuegos;
    };

    save(videojuegos){
        videojuegos.push(videojuegos);
        return "Videojuego agregado a FunTime";
    };
}

//EN ESTA CAPA SE INTERACTUA CON EL ALMACENAMIENTO
//EL MANAGER DE LOS ANTERIORES TRABAJOS REPRESENTA ESTA CAPA