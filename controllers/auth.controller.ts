import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { errorMsg } from "../const";
import Usuario from "../models/usuario.model";
import { generarJWT } from "../helpers/jwt";

export async function iniciarSesion(req: Request, res: Response) {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_BODY_IMCOMPLETO,
    });
  }

  const { email, contraseña } = req.body;

  try {
    const existe = await Usuario.findOne({ email });

    if (!existe) {
      return res.status(400).json({
        ok: false,
        msg: errorMsg.ERROR_EMAIL_NO_EXISTE,
      });
    }

    const esCorrecta = await bcrypt.compare(contraseña, existe.contraseña);

    if (!esCorrecta) {
      return res.status(400).json({
        ok: false,
        msg: errorMsg.ERROR_CONSTRASEÑA_INCORRECTA,
      });
    }

    const token = generarJWT(existe.id);

    res.json({
      ok: true,
      token,
      usuario: existe,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}
