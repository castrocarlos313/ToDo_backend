import mongoose from "mongoose";

const Usuario = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Usuario", Usuario);
