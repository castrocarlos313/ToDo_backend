import { Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import { errorMsg } from "../const";
import Folder from "../models/folder.model";
import Task from "../models/task.model";

export async function crearTask(req: Request, res: Response) {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_BODY_IMCOMPLETO,
    });
  }

  const { folderId } = req.body;

  if (!mongoose.isValidObjectId(folderId)) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_FOLDER_NO_EXISTE,
    });
  }

  try {
    const existeFolder = await Folder.findById(folderId);

    if (!existeFolder) {
      return res.status(400).json({
        ok: false,
        msg: errorMsg.ERROR_FOLDER_NO_EXISTE,
      });
    }

    const task = new Task(req.body);

    await task.save();

    return res.json({
      ok: true,
      task,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: true,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}

export async function obtenerTask(req: Request, res: Response) {
  const { folderId } = req.params;

  if (!mongoose.isValidObjectId(folderId)) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_FOLDER_NO_EXISTE,
    });
  }

  try {
    const existeFolder = await Folder.findById(folderId);

    if (!existeFolder) {
      return res.status(400).json({
        ok: false,
        msg: errorMsg.ERROR_FOLDER_NO_EXISTE,
      });
    }

    const tasks = await Task.find({ folderId });

    return res.json({
      ok: true,
      tasks,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: true,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}

export async function modificarTask(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_TASK_NO_EXISTE,
    });
  }

  if (Object.keys(req.body).length <= 1) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_BODY_IMCOMPLETO,
    });
  }

  try {
    const existeTask = await Task.findById(id);

    if (!existeTask) {
      return res.status(400).json({
        ok: false,
        msg: errorMsg.ERROR_TASK_NO_EXISTE,
      });
    }

    let modificacion = {};

    if (req.body.nombre) {
      modificacion = { ...modificacion, nombre: req.body.nombre };
    }

    if (typeof req.body.completo === "boolean") {
      modificacion = { ...modificacion, completo: req.body.completo };
    }

    const task = await Task.findByIdAndUpdate(id, modificacion, { new: true });

    return res.json({
      ok: true,
      task,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: true,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}

export async function eliminarTask(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      ok: false,
      msg: errorMsg.ERROR_TASK_NO_EXISTE,
    });
  }

  try {
    const existeTask = await Task.findById(id);

    if (!existeTask) {
      return res.status(400).json({
        ok: false,
        msg: errorMsg.ERROR_TASK_NO_EXISTE,
      });
    }

    const task = await Task.findByIdAndRemove(id, { new: true });

    return res.json({
      ok: true,
      task,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: true,
      msg: errorMsg.ERROR_INESPERADO,
    });
  }
}
