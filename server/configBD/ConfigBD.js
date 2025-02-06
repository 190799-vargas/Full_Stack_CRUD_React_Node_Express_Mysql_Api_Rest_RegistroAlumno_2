import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Coloca tu contraseña de MySQL
    database: "bd_crud_estudiantes_2",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default connection;