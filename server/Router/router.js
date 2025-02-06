import express from "express";
import {
    actualizarAlumno,
    crearAlumno,
    eliminarAlumnoPorId,
    listaAlumnos,
    obtenerAlumnoPorId,
} from "../ControllerAlumno.js";

//configurar el enrutador de Express
const router = express.Router();

// >>> define las rutas de la API <<<

// >>> obtener la lista de todos los alumnos <<<
router.get("/", async(req, res) =>{
    try {
        const alumnos = await listaAlumnos();
        res.json(alumnos);
    
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Error al consultar la lista de todos los alumnos"});

    }
});

// >>> obtener un alumno por su ID <<<
router.get("/:id", async (req, res) =>{
    try{
        const {id} = req.params;
        // Utiliza la función del controlador para obtener el alumno por su ID
        const alumno = await obtenerAlumnoPorId(id);
        res.json(alumno);
    
    }catch(error) {
        console.error(error);
        res.status(error.status || 500)
        .json({error: error.message || "Error al consultar alumno por ID"});
    }

});

// >>> crear un nuevo alumno <<<
router.post("/", async (req, res) =>{
    try{
        // Extrae los datos del alumno del cuerpo de la solicitud
        const datosAlumno = req.body;

        // Utiliza la función del controlador para crear un nuevo alumno
        await crearAlumno(datosAlumno);

        // Responde con un mensaje de éxito
        res.status(201).send("Alumno Registrado correctamente")
    
    }catch(error) {
        // Maneja cualquier error que ocurra durante la creación del alumno
        console.error(error);
        res.status(error.status || 500)
        .json({ error: error.message || "Error al crear el alumno" });
    }
});

// >>> actualizar un alumno <<<
router.put("/:id", async (req, res) =>{
    try{
        // Obtiene el ID del alumno de los parámetros de la solicitud
        const {id} = req.params;

        // Obtiene los datos actualizados del alumno del cuerpo de la solicitud
        const datosAlumno = req.body;
        
        // Utiliza la función del controlador para actualizar el alumno
        await actualizarAlumno(id, datosAlumno);
    
        // Responde con un mensaje de éxito
        res.status(200).send("Alumno actualizado correctamente");
    
    } catch (error) {
    // Maneja cualquier error que ocurra durante la actualización del alumno
    console.error(error);
    res.status(error.status || 500)
    .json({ error: error.message || "Error al actualizar el alumno" });
    }
    
});

// >>> eliminar un alumno <<< 
router.delete("/:id", async (req, res) => {
    try {
        // Obtiene el ID del alumno de los parámetros de la solicitud
        const { id } = req.params;

        // Verifica si el alumno existe antes de intentar eliminarlo
        const alumnoExistente = await obtenerAlumnoPorId(id);

        if (!alumnoExistente) {
            // Si el alumno no existe, responde con un mensaje de error
            return res.status(404).json({ error: "Alumno no encontrado" });
        }

        // Utiliza la función del controlador para eliminar el alumno
        await eliminarAlumnoPorId(id);

        // Responde con un mensaje de éxito
        res.status(200).send("Alumno eliminado correctamente");
    
    } catch (error) {
        // Maneja cualquier error que ocurra durante la eliminación del alumno
        console.error(error);

        // Responde con un mensaje de error adecuado
        res.status(error.status || 500)
            .json({ error: error.message || "Error al eliminar el alumno" });
    }
});


export default router;
