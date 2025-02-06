import express from "express";
import connection from "../configBD/ConfigBD.js";

//configurar el enrutador de Express
const router = express.Router();

// >>> define las rutas de la API <<<

// >>> obtener todos los alumnos registrados <<<
router.get("/", async (req, res) =>{
    try{
        // Consulta todos los usuarios en la base de datos
        const [rows] = await connection.execute("SELECT * FROM tbl_alumnos");
        res.json(rows);
    
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar la lista de todos los alumnos" });
    }
});

// >>> obtener un alumno por su ID <<<
router.get("/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        // Consulta todos los usuarios en la base de datos
        const [rows] = await connection.execute("SELECT * FROM tbl_alumnos WHERE id = ?",[id]);
    res.json(rows);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar el alumno con ese ID" });
    }
});

// >>> crear un nuevo alumno <<<
router.post("/", async (req, res) =>{
    try{
        // Crea un nuevo usuario en la base de datos
    const {
        nombre_alumno,
        email_alumno,
        curso_alumno,
        sexo_alumno,
        habla_ingles,
    } = req.body;
    await connection.execute("INSERT INTO tbl_alumnos (nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles) VALUES (?,?,?,?,?)",
        [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles]
    );
    res.status(201).send("Alumno creado correctamente");
    
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar un nuevo alumno" });
    }
});

// >>> actualizar alumno <<<
router.put("/:id", async (req, res) =>{
    try{
        // id que viene en el req.params
        const { id } = req.params;
        // Datos que vienenen el req.body
        const {
            nombre_alumno,
            email_alumno,
            curso_alumno,
            sexo_alumno,
            habla_ingles,
        } = req.body;
        await connection.execute("UPDATE tbl_alumnos SET nombre_alumno =?, email_alumno =?, curso_alumno =?, sexo_alumno =?, habla_ingles =?  WHERE id =? ",
            [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles, id]
        );
        res.status(200).send("Alumno actualizado correctamente");
    
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el alumno" });
    }
});

// >>> eliminar un alumno <<<
router.delete("/:id", async (req, res) =>{
    try{
        // Elimina un usuario existente en la base de datos
        const { id } = req.params;
        await connection.execute("DELETE FROM tbl_alumnos WHERE id =?", [id]);
        res.status(200).send("Alumno eliminado correctamente");
    
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar alumno" });
    }

});

export default router;