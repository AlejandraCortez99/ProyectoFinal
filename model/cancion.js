//Este esquema es solo un medio para un fin
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaCancion = new Schema(
  {
    idApi: String,
    comentarios: [{ type: Schema.Types.ObjectId, ref: "comentarios" }],
  }
);

const Cancion = mongoose.model("Cancion", esquemaCancion);
module.exports = Cancion;