const mongoose = require("mongoose");
const { Schema } = mongoose

const esquemaComentarios = new Schema(
  {
    usuario: String,
    comentario: String,
    //Rating quizas(?): _
},
    {
        timestamps:{
            postedAt: "guardado",
        }
    }
);

const coments = mongoose.model("EnDuda(?)", esquemaComentarios);
module.exports = coments;