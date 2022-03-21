import mongoose from "mongoose";

const Task = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  completo: {
    type: Boolean,
    default: false,
  },
  folderId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

export default mongoose.model("Task", Task);
