const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Usuario = require("../model/usuario");
const Favorito = require("../model/Favorito");

require("../basedatos/bd");

const salt = bcrypt.genSaltSync(10);

let favoritos = [
  {
    _id: "60d6309ffe9db029b0d0a090",
    idApi:"6752573",
    idAlbum:"447891",
    titulo: "Como La Flor",
    autor: "Selena",
    album: "All My Hits: Todos Mis Exitos",
  },
  {
    _id: "60d6309ffe9db029b0d0a091",
    idApi:"120339",
    idAlbum:"7171",
    titulo: "Even Flow",
    autor: "Pearl Jam",
    album: "rearviewmirror (greatest hits 1991-2003)"
  },
  {
    _id: "60d6309ffe9db029b0d0a092",
    idApi:"158558",
    idAlbum:"9518",
    titulo: "Reptilia",
    autor: "The Strokes",
    album: "Room On Fire",
  },
];
let usuarios = [
  {
    _id: "60d6309ffe9db029b0d0a099",
    nombre: "Manolo99",
    email: "manoloaguirre@hotmail.com",
    password: "aniversario123",
    favoritos: ["60d6309ffe9db029b0d0a090","60d6309ffe9db029b0d0a091","60d6309ffe9db029b0d0a092"],
  },
  {
    _id: "60d6309ffe9db029b0d0a098",
    nombre: "MelomaniaSDK",
    email:"sradelkinto@hotmail.com",
    password: "en.busca.del.mejor.album",
    favoritos: [],
  },
  {
    _id: "60d6309ffe9db029b0d0a097",
    nombre: "reborn_18",
    email: "jorgem@hotmail.es",
    password: "jmcid21899",
    favoritos: [],
  },
];

usuarios.forEach((usuario) => {
  let hashPass = bcrypt.hashSync(usuario.password, salt);
  usuario.password = hashPass;
});

Favorito.deleteMany()
  .then(() => {
    console.log(`Favoritos eliminadas`);
    return Favorito.create(favoritos);
  })
  .then((favoritosCreados) => {
    console.log(`${favoritosCreados.length} favoritos nuevos`);
    favoritosCreados.forEach((favorito) => {
      console.log(favorito.titulo);
    });
  })
  .then(() => {
    Usuario.deleteMany()
      .then(() => {
        console.log(`Usuarios eliminados`);
        return Usuario.create(usuarios);
      })
      .then((usuariosCreados) => {
        console.log(
          `${usuariosCreados.length} usuarios han sido creados con los siguientes nombres:`
        );
        usuariosCreados.forEach((usuario) => {
          console.log(usuario.nombre);
        });
      })
      .then(() => {
        mongoose.disconnect();
        console.log("Nos hemos desconectado de la base de datos.");
      })
      .catch((error) => {
        console.log("Hay un error:");
        console.log(error);
      });
  })
  .catch((error) => {
    console.log("Hay un error:");
    console.log(error);
  });
