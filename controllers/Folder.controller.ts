import { Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import { errorMsg } from "../const";
import Folder from "../models/folder.model";
import taskModel from "../models/task.model";

export async function crearFolder(req: Request, res: Response) {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_BODY_IMCOMPLETO,
    });
  }

  try {
    const folder = new Folder(req.body);

    await folder.save();

    res.json({
      ok: true,
      folder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}
export async function obtenerFolders(req: Request, res: Response) {
  const { uid } = req.body;

  try {
    const folders = await Folder.find({ uid });

    return res.json({
      ok: true,
      folders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}

export async function modificarFolder(req: Request, res: Response) {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_BODY_IMCOMPLETO,
    });
  }

  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_FOLDER_NO_EXISTE,
    });
  }

  const { nombre } = req.body;
  try {
    const existe = await Folder.findById(id);

    if (!existe) {
      return res.status(400).json({
        ok: false,
        msg: errorMsg.ERROR_FOLDER_NO_EXISTE,
      });
    }

    const folder = await Folder.findByIdAndUpdate(
      id,
      { nombre },
      { new: true }
    );

    return res.json({
      ok: true,
      folder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}

export async function eliminarFolder(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_FOLDER_NO_EXISTE,
    });
  }

  try {
    const existe = await Folder.findById(id);

    if (!existe) {
      return res.status(400).json({
        ok: false,
        msg: errorMsg.ERROR_FOLDER_NO_EXISTE,
      });
    }

    const [folder] = await Promise.all([
      Folder.findByIdAndRemove(id, { new: true }),
      taskModel.deleteMany({ folderId: id }),
    ]);

    return res.json({
      ok: true,
      folder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}
