import express from "express";
import "dotenv/config";
import { conectarDB } from "./config/db";
import router from "./routes";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

conectarDB();

app.use(router);

app.listen(PORT, () =>
  console.log(`El servidor esta corriendo en el puerto ${PORT}`)
);
