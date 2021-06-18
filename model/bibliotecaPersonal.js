const mongoose = require("mongoose");
const { Schema } = mongoose

const bibliotecaUsuario = new Schema(
  {
    tituloCancion: String,
    autor: String,
    album: String,
},
    {
        timestamps:{
            savedAt: "guardado",
        }
    }
);

const ModeloBiblioteca = mongoose.model("BibliotecasPersonales", bibliotecaUsuario);
module.exports = ModeloBiblioteca;