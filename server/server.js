import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./Router/router.js"; // Importa el router correctamente

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/alumnos", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(` Servidor corriendo en el puerto ${PORT}`);
});
