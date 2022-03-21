import mongoose from "mongoose";

const Folder = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  uid: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

export default mongoose.model("Folder", Folder);
