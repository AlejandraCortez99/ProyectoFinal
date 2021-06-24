const mongoose = require("mongoose");
const { Schema } = mongoose

const favoritosUsuario = new Schema(
  {
    titulo: String,
    autor: String,
    album: String,
},
    {
        timestamps: true,
    }
);

const BibliotecasPersonales = mongoose.model("BibliotecasPersonales", favoritosUsuario);
module.exports = BibliotecasPersonales;