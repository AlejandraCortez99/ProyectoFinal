const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritoSchema = new Schema(
  {
    titulo: String,
    autor: String,
    album: String,
  },
  {
    timestamps: {
      createdAt: "created at",
      updatedAt: "updated at",
    },
  }
);

const Favorito = mongoose.model("Favorito", favoritoSchema);
module.exports = Favorito;