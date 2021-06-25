const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaUsuario = new Schema(
  {
    nombre: String,
    email: String,
    password: String,
    favoritos: [{ type: Schema.Types.ObjectId, ref: "Favorito" }],
  },
  {  
    timestamps: true,
  }

);

const ModeloUsuario = mongoose.model("usuario", esquemaUsuario);
module.exports = ModeloUsuario;
