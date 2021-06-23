const mongoose = require("mongoose");
const { Schema } = mongoose

const esquemaUsuario = new Schema(
  {
    nombre: String,
    contraseña: String,
    bibliotecaPersonal: Array,
  },
  {  
    timestamps: {
      createdAt: "creado",
    },
  }

);

const ModeloUsuario = mongoose.model("Usuarios", esquemaUsuario);
module.exports = ModeloUsuario;
