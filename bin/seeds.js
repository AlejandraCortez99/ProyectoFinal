const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Usuario = require("../model/usuario");
const Favorito = require("../model/Favorito");

require("../basedatos/bd");

const salt = bcrypt.genSaltSync(10);

let favoritos = [
  {
    _id: "60d6309ffe9db029b0d0a090",
    titulo: "Uprising",
    autor: "Muse",
    album: "The Resistance",
  },
  {
    _id: "60d6309ffe9db029b0d0a091",
    titulo: "Porch",
    autor: "Pearl Jam",
    album: "Ten",
  },
  {
    _id: "60d6309ffe9db029b0d0a092",
    titulo: "Ize of the world",
    autor: "The Strokes",
    album: "First Impressions of Earth",
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
