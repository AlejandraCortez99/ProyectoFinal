const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaUsuario = new Schema(
  {
    nombre: String,
    contraseña: String,
    favoritos: [{ type: Schema.Types.ObjectId, ref: "Favoritos" }],
  },
  {  
    timestamps: true,
  }

);

const ModeloUsuario = mongoose.model("Usuarios", esquemaUsuario);
module.exports = ModeloUsuario;
