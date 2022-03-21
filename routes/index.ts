import { Router } from "express";
import { check } from "express-validator";
import { iniciarSesion } from "../controllers/auth.controller";
import {
  crearFolder,
  eliminarFolder,
  modificarFolder,
  obtenerFolders,
} from "../controllers/Folder.controller";
import {
  crearTask,
  eliminarTask,
  modificarTask,
  obtenerTask,
} from "../controllers/task.controller";
import {
  crearUsuario,
  obtenerUsuario,
} from "../controllers/usuario.controller";
import { chequeraJWT } from "../middlewares/jwt.middleware";

const router = Router();

// http://localhost:5000/api/usuario
router.post(
  "/api/usuario",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es invalido").isEmail(),
    check("contraseña", "La contraseña es obligatorio").not().isEmpty(),
  ],
  crearUsuario
);
router.get("/api/usuario", [chequeraJWT], obtenerUsuario);

// http://localhost:5000/api/auth
router.post(
  "/api/auth",
  [
    check("email", "El email es invalido").isEmail(),
    check("contraseña", "La contraseña es obligatorio").not().isEmpty(),
  ],
  iniciarSesion
);

// http://localhost:5000/api/folder
router.post(
  "/api/folder",
  [check("nombre", "El nombre es obligatorio").not().isEmpty(), chequeraJWT],
  crearFolder
);
router.get("/api/folder", [chequeraJWT], obtenerFolders);
router.put(
  "/api/folder/:id",
  [check("nombre", "El nombre es obligatorio").not().isEmpty(), chequeraJWT],
  modificarFolder
);
router.delete("/api/folder/:id", [chequeraJWT], eliminarFolder);

// http://localhost:5000/api/task
router.post(
  "/api/task",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("folderId", "El id es obligatorio").not().isEmpty(),
    chequeraJWT,
  ],
  crearTask
);
router.get("/api/task/:folderId", [chequeraJWT], obtenerTask);
router.put("/api/task/:id", [chequeraJWT], modificarTask);
router.delete("/api/task/:id", [chequeraJWT], eliminarTask);

export default router;
