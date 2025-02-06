import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import FormularioAlumno from "../components/FormularioAlumno.jsx";
import FormularioEditarAlumno from "../components/FormularioEditarAlumno.jsx";
import ListAlumno from "../components/ListAlumno.jsx";
import Titulo from "../components/Titulo.jsx";

/** Alertas con React Toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
    const [alumnos, setAlumnos] = useState([]); // Lista de alumnos
    const [alumnoEditar, setAlumnoEditar] = useState(null); // Alumno seleccionado para editar
    const [showRegistroForm, setShowRegistroForm] = useState(true); // Controla qué formulario mostrar
    const URL_API = "http://localhost:8080/alumnos";

    useEffect(() => {
        obtenerAlumnos();
    }, []);

    /** Obtener lista de alumnos */
    const obtenerAlumnos = async () => {
        try {
            const response = await axios.get(URL_API);
            setAlumnos(response.data);
        } catch (error) {
            console.error("Error al obtener alumnos:", error);
            toast.error("Error al cargar la lista de alumnos.");
        }
    };

    /** Eliminar un alumno */
    const eliminarAlumno = async (id) => {
        try {
            const response = await axios.delete(`${URL_API}/${id}`);
            console.log("Alumno eliminado:", response.data);
            toast.success("Alumno eliminado correctamente.");
            obtenerAlumnos();
        } catch (error) {
            console.error("Error al eliminar alumno:", error);
            toast.error("No se pudo eliminar el alumno.");
        }
    };

    /** Obtener datos del alumno para edición */
    const obtenerDatosAlumno = (id) => {
        const alumno = alumnos.find((alumno) => alumno.id === id);
        console.log("Alumno seleccionado:", alumno);

        if (alumno) {
            setAlumnoEditar(alumno);
            setShowRegistroForm(false);  // Mostrar el formulario de edición
        } else {
            console.error("No se encontró el alumno seleccionado.");
            toast.error("No se encontró el alumno seleccionado.");
        }
    };

    /** Agregar nuevo alumno */
    const agregarAlumno = async (nuevoAlumno) => {
        try {
            await axios.post(URL_API, nuevoAlumno);
            toast.success("Alumno registrado correctamente.");
            obtenerAlumnos();
        } catch (error) {
            console.error("Error al agregar alumno:", error);
            toast.error("No se pudo registrar el alumno.");
        }
    };

    /** Actualizar información del alumno */
    const handleActualizarAlumno = async (alumnoActualizado) => {
        if (!alumnoActualizado || !alumnoActualizado.id) {
            toast.error("Datos del alumno no válidos.");
            return;
        }

        try {
            await axios.put(`${URL_API}/${alumnoActualizado.id}`, alumnoActualizado);
            toast.success("Alumno actualizado correctamente.");
            obtenerAlumnos();
            setAlumnoEditar(null); // Limpiar estado después de actualizar
            setShowRegistroForm(true); // Volver al formulario de registro
        } catch (error) {
            console.error("Error al actualizar alumno:", error);
            toast.error("No se pudo actualizar la información del alumno.");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="row justify-content-md-center">
                <div className="col-md-5">
                    <Titulo estado={showRegistroForm} setShowRegistroForm={setShowRegistroForm} />

                    {/* Mostrar formulario según estado */}
                    {!showRegistroForm && alumnoEditar ? (
                        <FormularioEditarAlumno
                            alumno={alumnoEditar}  // Asegúrate de pasar el alumno a editar
                            handleActualizarAlumno={handleActualizarAlumno}
                        />
                    ) : (
                        <FormularioAlumno agregarAlumno={agregarAlumno} />
                    )}

                </div>

                {/* Lista de Alumnos */}
                <ListAlumno
                    alumnos={alumnos}
                    eliminarAlumno={eliminarAlumno}
                    obtenerDatosAlumno={obtenerDatosAlumno}  // Pasamos la función para obtener datos al hacer clic
                />
            </div>
        </>
    );
};

export default HomePage;
