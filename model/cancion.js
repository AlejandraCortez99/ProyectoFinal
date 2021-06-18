const mongoose = require("mongoose");
const { Schema } = mongoose

const esquemaTrack = new Schema(
  {
    titulo: String,
    autor: String,
    album: String,
    comentarios: Array,
  },
  {
      timestamps:{
        realeaseDate: String, 
      }
  }
);

const cancion = mongoose.model("Canciones", esquemaTrack);
module.exports = cancion;