import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorMsg } from "../const";
import Usuario from "../models/usuario.model";

export async function chequeraJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("token") as string;

  try {
    jwt.verify(
      token,
      process.env["SECRETA"] as string,
      async (err, decoded) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            valido: false,
            error: err,
          });
        }

        if (typeof decoded === "string") {
          return res.status(400).json({
            ok: false,
            valido: false,
            msg: errorMsg.ERROR_JWT,
          });
        }

        decoded = decoded as JwtPayload;

        const id = decoded["id"];
        const usuario = await Usuario.findById(id);
        if (!usuario) {
          return res.status(400).json({
            ok: false,
            valido: false,
            msg: errorMsg.ERROR_JWT,
          });
        }

        req.body.uid = usuario.id;

        next();
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}
