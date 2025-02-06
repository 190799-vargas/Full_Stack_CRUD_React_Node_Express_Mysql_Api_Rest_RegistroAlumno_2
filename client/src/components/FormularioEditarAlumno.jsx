import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const FormularioEditarAlumno = ({ alumno, handleActualizarAlumno }) => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [curso, setCurso] = useState("");
    const [sexo, setSexo] = useState("");
    const [hablaIngles, setHablaIngles] = useState("");

    // Verifica si el alumno existe antes de acceder a sus propiedades
    useEffect(() => {
        if (!alumno) {
            console.error("El alumno no fue recibido correctamente");
            return;
        }

        setNombre(alumno?.nombre_alumno ?? "");
        setEmail(alumno?.email_alumno ?? "");
        setCurso(alumno?.curso_alumno ?? "");
        setSexo(alumno?.sexo_alumno ?? "");
        setHablaIngles(alumno?.habla_ingles ?? "");
    }, [alumno]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (
            nombre === alumno.nombre_alumno &&
            email === alumno.email_alumno &&
            curso === alumno.curso_alumno &&
            sexo === alumno.sexo_alumno &&
            hablaIngles === alumno.habla_ingles
        ) {
            alert("No hay cambios para actualizar.");
            return;
        }

        handleActualizarAlumno({
            id: alumno.id, // Asegurar que el ID se envía
            nombre_alumno: nombre,
            email_alumno: email,
            curso_alumno: curso,
            sexo_alumno: sexo,
            habla_ingles: hablaIngles,
        });
    };

    const handleSexoChange = (e) => setSexo(e.target.value);
    const handleInglesChange = (e) => setHablaIngles(e.target.value);

    // Si el alumno no ha sido cargado aún, mostrar un mensaje
    if (!alumno || Object.keys(alumno).length === 0) {
        return <p className="alert alert-info">Cargando datos del alumno...</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nombre del Alumno</label>
                <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Curso</label>
                <select
                    className="form-select"
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                    required
                >
                    <option value="">Seleccione el Curso</option>
                    <option value="ReactJS">ReactJS</option>
                    <option value="Python">Python</option>
                    <option value="NodeJS">NodeJS</option>
                </select>
            </div>
            <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-3">Sexo del alumno:</label>
                <div className="list-group-items">
                    <div className="form-check me-2">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="sexo"
                            value="Masculino"
                            checked={sexo === "Masculino"}
                            onChange={handleSexoChange}
                        />
                        <label className="form-check-label">Masculino</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="sexo"
                            value="Femenino"
                            checked={sexo === "Femenino"}
                            onChange={handleSexoChange}
                        />
                        <label className="form-check-label">Femenino</label>
                    </div>
                </div>
            </div>
            <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-3">¿Habla Inglés?</label>
                <div className="list-group-items">
                    <div className="form-check me-2">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="hablaIngles"
                            value="SI"
                            checked={hablaIngles === "SI"}
                            onChange={handleInglesChange}
                        />
                        <label className="form-check-label">Sí</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="hablaIngles"
                            value="NO"
                            checked={hablaIngles === "NO"}
                            onChange={handleInglesChange}
                        />
                        <label className="form-check-label">No</label>
                    </div>
                </div>
            </div>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                    Actualizar Alumno
                </button>
            </div>
        </form>
    );
};

// Validación de PropTypes
FormularioEditarAlumno.propTypes = {
    alumno: PropTypes.object,  // Asegúrate de que alumno sea un objeto
    handleActualizarAlumno: PropTypes.func.isRequired,
};

export default FormularioEditarAlumno;
