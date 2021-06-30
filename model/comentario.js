const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaComentario = new Schema(
  {
    usuario: String,
    texto: String,
  },
  {
    timestamps: true
  }
);

const Comentario = mongoose.model("comentario", esquemaComentario);
module.exports = Comentario;
