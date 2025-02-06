import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types"; // Realizar la validación de tipos de las propiedades (props) que recibe un componente.
import { useState } from "react";

const FormularioAlumno = ({ agregarAlumno }) => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [curso, setCurso] = useState("");
    const [sexo, setSexo] = useState("");
    const [hablaIngles, setHablaIngles] = useState("");

    // Función para manejar cambios en el sexo del alumno
    const handleSexo = (e) => {
        setSexo(e.target.value);
    };

    // Función para manejar cambios en el idioma
    const handleHablaIngles = (e) => {
        setHablaIngles(e.target.value);
    };

    // Función para agregar o registrar Alumno
    const handleSubmit = (e) => {
        e.preventDefault();
        agregarAlumno({
            nombre_alumno: nombre,
            email_alumno: email,
            curso_alumno: curso,
            sexo_alumno: sexo,
            habla_ingles: hablaIngles, // Ahora guarda "SI" o "NO"
        });

        // Limpiar el formulario después de agregar el alumno
        setNombre("");
        setEmail("");
        setCurso("");
        setSexo("");
        setHablaIngles("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nombre del Alumno</label>
                <input
                    type="text"
                    name="nombre_alumno"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email del Alumno</label>
                <input
                    type="email"
                    name="email_alumno"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Seleccione el Curso</label>
                <select
                    name="curso_alumno"
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
                            className="form-check-input"
                            type="radio"
                            name="sexo_alumno"
                            id="Masculino"
                            value="Masculino"
                            checked={sexo === "Masculino"}
                            onChange={handleSexo}
                            required
                        />
                        <label className="form-check-label" htmlFor="Masculino">
                            Masculino
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="sexo_alumno"
                            id="Femenino"
                            value="Femenino"
                            checked={sexo === "Femenino"}
                            onChange={handleSexo}
                        />
                        <label className="form-check-label" htmlFor="Femenino">
                            Femenino
                        </label>
                    </div>
                </div>
            </div>

            <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-3">¿Hablas Inglés?</label>
                <div className="list-group-items"> 
                    <div className="form-check me-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="habla_ingles"
                            id="si"
                            value="SI"
                            checked={hablaIngles === "SI"}
                            onChange={handleHablaIngles}
                            required
                        />
                        <label className="form-check-label" htmlFor="si">
                            Sí
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="habla_ingles"
                            id="no"
                            value="NO"
                            checked={hablaIngles === "NO"}
                            onChange={handleHablaIngles}
                        />
                        <label className="form-check-label" htmlFor="NO">
                            No
                        </label>
                    </div>
                </div>
            </div>

            <div className="d-grid gap-2 mb-3">
                <button type="submit" className="btn btn-primary block btn_add">
                    Registrar 
                </button>
            </div>
        </form>
    );
};

// Validación de PropTypes
FormularioAlumno.propTypes = {
    agregarAlumno: PropTypes.func.isRequired,
};

export default FormularioAlumno;
