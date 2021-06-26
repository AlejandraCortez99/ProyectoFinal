const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaTrack = new Schema(
  {
    titulo: String,
    autor: String,
    album: String,
    letra: String,
    rating: Function, 
    comentario: String,
  },
  {
      timestamps:{
        realeaseDate: String, 
      }
  }
);

const cancion = mongoose.model("Canciones", esquemaTrack);
module.exports = cancion;