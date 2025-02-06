import connection from "./configBD/ConfigBD.js";

// funcion para obtener la lista de todos los estudiantes registrados
export const listaAlumnos = async () => {
    try {
        //consulta SQL que selecciona todos los registros de la tabla tbl_alumnos.
        const [rows] = await connection.execute("SELECT * FROM  tbl_alumnos"); 
        return rows;
    } catch (error) {
        // Crear una instancia de Error con el mensaje personalizado
        const customError = new Error("Error al obtener estudiantes");
        customError.status = 500; // Añadir el código de estado al error
        
        // Lanzar el error personalizado
        throw customError;
    }
    
};

// >>> Función para obtener un alumno por su ID <<<
export const obtenerAlumnoPorId = async (id) => {
    try {
        // Verificar si el ID es un número válido
        if (isNaN(id)) {
            throw new Error("El ID proporcionado no es válido. Debe ser un número.");
        }

        // Realiza la consulta en la base de datos por ID
        const [rows] = await connection.execute("SELECT * FROM tbl_alumnos WHERE id=?", [id]);

        // Si no se encuentra el alumno, lanzar un error
        if (rows.length === 0) {
            throw new Error(`No se encontró un alumno con el ID: ${id}`);
        }

        // Retorna el primer alumno encontrado (ya que esperamos solo uno con ese ID)
        return rows[0];
    
    } catch (error) {
        // Crear una instancia de Error con el mensaje personalizado
        const customError = new Error(error.message || "Error al obtener el alumno por el ID solicitado");
        customError.status = 500; // Añadir el código de estado al error
        
        // Lanzar el error personalizado
        throw customError;
    }
};


//funcion para crear un nuevo alumno
export const crearAlumno = async (datosAlumno) =>{
    const {
        nombre_alumno,
        email_alumno,
        curso_alumno,
        sexo_alumno,
        habla_ingles,
    } = datosAlumno;

    try {
        // Realiza la inserción del nuevo alumno en la base de datos
        await connection.execute("INSERT INTO tbl_alumnos (nombre_alumno,email_alumno,curso_alumno,sexo_alumno,habla_ingles) VALUES (?,?,?,?,?)",
            [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles]);

    } catch (error) {
        // Crear una instancia de Error con el mensaje personalizado
        const customError = new Error("Error al Registrar un nuevo estudiante ");
        customError.status = 500; // Añadir el código de estado al error
        
        // Lanzar el error personalizado
        throw customError;
    }
};

//Funcion para actualizar un estudiante 
export const actualizarAlumno = async (id, datosAlumno) =>{
    const {
        nombre_alumno,
        email_alumno,
        curso_alumno,
        sexo_alumno,
        habla_ingles,
    } = datosAlumno;

    try {
        // Realiza la actualización del alumno en la base de datos
        await connection.execute ("UPDATE tbl_alumnos SET  nombre_alumno = ?, email_alumno = ?, curso_alumno = ?, sexo_alumno = ?, habla_ingles = ? WHERE id = ?",
            [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles, id]
        );
    } catch (error) {
        // Crear una instancia de Error con el mensaje personalizado
        const customError = new Error("Error al Actualizar el estudiante ");
        customError.status = 500; // Añadir el código de estado al error
        
        // Lanzar el error personalizado
        throw customError;
    }
};

// Función para eliminar un alumno por ID
export const eliminarAlumnoPorId = async (id) => {
    try {
        // Verifica si el alumno existe antes de intentar eliminarlo
        const [rows] = await connection.execute("SELECT * FROM tbl_alumnos WHERE id = ?", [id]);

        // Si no se encuentra el alumno, lanzar un error
        if (rows.length === 0) {
            throw new Error(`No se encontró un alumno con el ID: ${id}`);
        }

        // Realiza la eliminación del alumno en la base de datos
        const result = await connection.execute("DELETE FROM tbl_alumnos WHERE id = ?", [id]);

        // Verifica si se eliminó algún registro
        if (result.affectedRows === 0) {
            throw new Error(`No se pudo eliminar el alumno con el ID: ${id}`);
        }

        // salió bien, no es necesario retornar nada, pero puedes agregar un mensaje si lo deseas
        return `Alumno con ID ${id} eliminado correctamente.`;
    
    } catch (error) {
        // Crear una instancia de Error con el mensaje personalizado
        const customError = new Error(error.message || "Error al eliminar el estudiante");
        customError.status = 500; // Añadir el código de estado al error
        
        // Lanzar el error personalizado
        throw customError;
    }
};
