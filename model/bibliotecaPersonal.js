const mongoose = require("mongoose");
const { Schema } = mongoose

const bibliotecaUsuario = new Schema(
  {
    titulo: String,
    autor: String,
    album: String,
},
    {
        timestamps:{
            savedAt: "guardado",
        }
    }
);

const BibliotecasPersonales = mongoose.model("BibliotecasPersonales", bibliotecaUsuario);
module.exports = BibliotecasPersonales;