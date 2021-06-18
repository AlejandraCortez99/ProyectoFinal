const mongoose = require("mongoose");

require("./basedatos/bd");

let bibliotecasUsuarios = [
    {
        tituloCancion: "Uprising",
        autor: "Muse",
        album: "The Resistance",
    },
    {
        tituloCancion: "Porch",
        autor: "Pearl Jam",
        album: "Ten",
    },
    {
        tituloCancion: "Ize of the world",
        autor: "The Strokes",
        album: "First Impressions of Earth",
    },
];
let canciones = [
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
];
let Usuarios = [
    {
        nombre: "Manolo99",
        email: "manoloujs@hotmail.com",
        contraseña: "aniversario123",
        bibliotecaPersonal: Array,
    },
    {
        nombre: "MelomaniaSDK",
        email: "sandradelibesK@gmail.com",
        contraseña: "virtue.es.el.mejor.album",
        bibliotecaPersonal: Array,
    },
    {
        nombre: "reborn_18",
        email: "jorge_major@hotmail.es",
        contraseña: "jmcid21",
        bibliotecaPersonal: Array,
    },
];
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
