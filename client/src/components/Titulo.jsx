import PropTypes from "prop-types";

const Titulo = ({ estado, setShowRegistroForm }) => {
  const volver = () => {
    console.log("volver");
    setShowRegistroForm(true);
  };

  return (
    <h1
      className="text-center mb-3 mt-1 font-weight-bold position-relative"
      style={estado ? {} : { marginLeft: "5px" }} // Desplazar el título cuando el botón "Volver" está visible
    >
      {!estado && (
        <button
          onClick={volver}
          className="btn btn-outline-primary"
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-70%)",
            fontSize: "1rem", // Reducir el tamaño del texto en el botón
            padding: "3px 6px", // Hacer el botón más pequeño
            borderRadius: "6px", // Opcional: para hacerlo más estilizado
            cursor: "pointSer",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <i className="bi bi-arrow-left"></i> Volver
        </button>
      )}
      {estado ? "Registrar alumno" : "Editar alumno"}
      <hr />
    </h1>
  );
};

// PropTypes
Titulo.propTypes = {
  setShowRegistroForm: PropTypes.func.isRequired,
  estado: PropTypes.bool.isRequired,
};

export default Titulo;
