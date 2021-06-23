const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const Usuario = require("./model/usuario");
const BibliotecaPersonal = require("./model/bibliotecaPersonal");

require("./basedatos/bd");

const salt = bcrypt.genSaltSync(10);

let bibliotecasPersonales = [
  {
    _id: "1234567890",
    tituloCancion: "Uprising",
    autor: "Muse",
    album: "The Resistance",
  },
  {
    _id: "1234567891",
    tituloCancion: "Porch",
    autor: "Pearl Jam",
    album: "Ten",
  },
  {
    _id: "1234567892",
    tituloCancion: "Ize of the world",
    autor: "The Strokes",
    album: "First Impressions of Earth",
  },
];
let usuarios = [
    {
      nombre: "Manolo99",
      contraseña: "aniversario123",
      bibliotecaPersonal: [],
    },
    {
      nombre: "MelomaniaSDK",
      contraseña: "en.busca.del.mejor.album",
      bibliotecaPersonal: [],
    },
    {
      nombre: "reborn_18",
      contraseña: "jmcid21",
      bibliotecaPersonal: [],
    },
  ];

/* let canciones = [
    {
        titulo: "Como la flor",
        autor: "Selena",
        album: "dreaming of you",
        comentarios: Array,
    },
    {
        titulo: "Evil",
        autor: "Interpol",
        album: "Antics",
        comentarios: Array,
    },
    {
        titulo: "Pink Ocean",
        autor: "The Voidz",
        album: "Virtue",
        comentarios: Array,
    },
]; */

/* let Comentarios = [
    {
        usuario: "Manolo99",
        comentario: "Esta canción siempre me hace bailar!!:)",
        Rating quizas(?): _

    },
    {
        usuario: "MelomaniaSDK",
        comentario: "Yo creo que el significado de esta canción va más allá de lo superficialidad que pueda evocar su letra...",
        Rating quizas(?): _
    },
    {
        usuario: "reborn_18",
        comentario: "No entiendo xq a la gente le mola tanto esta cancion, a mi se me hace muy aburrida",
        Rating quizas(?): _
    }
] */
usuarios.forEach((usuario) => {
  let hashPass = bcrypt.hashSync(usuario.contraseña, salt);
  usuario.contraseña = hashPass;
});

bibliotecasPersonales.forEach((bibliotecaPersonal) => {
  let bibliotecaId = BibliotecaPersonal._id;
  let max = usuarios.length - 1;
  let userIndex = Math.floor(Math.random() * max);
  usuarios[userIndex].bibliotecasPersonales.push(bibliotecaId);
});
