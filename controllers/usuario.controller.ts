import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Usuario from "../models/usuario.model";
import { errorMsg } from "../const";
import { generarJWT } from "../helpers/jwt";
import mongoose from "mongoose";

export async function crearUsuario(req: Request, res: Response) {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_BODY_IMCOMPLETO,
    });
  }

  const { nombre, email, contraseña } = req.body;

  try {
    const existe = await Usuario.findOne({ email });

    if (existe) {
      return res.status(400).json({
        ok: false,
        msg: errorMsg.ERROR_EMAIL_TOMADO,
      });
    }

    const salt = await bcrypt.genSalt(10);

    const resultado = await bcrypt.hash(contraseña, salt);

    const usuario = new Usuario({ nombre, email, contraseña: resultado });

    await usuario.save();

    const token = generarJWT(usuario.id);

    return res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}

export async function obtenerUsuario(req: Request, res: Response) {
  const { uid } = req.body;
  if (!mongoose.isValidObjectId(uid)) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_USUARIO_NO_EXISTE,
    });
  }
  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: errorMsg.ERROR_USUARIO_NO_EXISTE,
      });
    }

    const token = generarJWT(usuario.id);

    return res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}
