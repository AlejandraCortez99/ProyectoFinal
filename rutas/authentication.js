require("dotenv").config();

const express = require("express");
const authRoutes = express.Router();
const tokenValidation = require("../functions/tokenValidation");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Favorito = require("../model/favorito");
const Usuario = require("../model/usuario");
// const Cancion = require("../model/cancion");
// const Comentario = require("../model/comentario");

const expirationTime = 10800;

const salt = bcrypt.genSaltSync(10);

authRoutes.post("/signup", async (req, res) => {
  const usuario = req.body.nombre;
  const email = req.body.email;
  const password = req.body.password;
  console.log(usuario,email,password);
  if (usuario === "" || password === "" || email === "") {
    res.send({
      auth: false,
      token: null,
      message: "Establezca un nombre de usuario y contraseña",
    });
    return;
  }
  if (password.length < 8) {
    res.send({
      auth: false,
      token: null,
      message: "Por favor, para mayor seguridad, la contraseña debe contener mínimo 8 caracteres",
    });
    return;
  }

  let foundUsario = await Usuario.findOne({
    nombre: usuario,
    email: email,
  }).then((repeatedUser) => {
    return repeatedUser;
  });

  if (foundUsario != null) {
    res.send({
      auth: false,
      token: null,
      message: "Usuario ya existente. Pruebe a utilizar otro",
    });
    return;
  }

  const hashPass = bcrypt.hashSync(password, salt);

  let nuevoUsuario = await Usuario.create({
    nombre: usuario,
    email: email,
    password: hashPass,
    favoritos: [],
  })
    .then((createdUser) => {
      return createdUser;
    })
    .catch((error) => {
      res.send({
        auth: false,
        token: null,
        message: `Ha ocurrido el siguiente error: ${error}`,
      });
      return;
    });

  const newToken = jwt.sign({ id: nuevoUsuario._id }, process.env.SECRET_WORD, {
    expiresIn: expirationTime,
  });
  res.send({
    auth: true,
    token: newToken,
    message: "El usuario se ha creado con exito",
  });
});

authRoutes.post("/login", async (req, res) => {
  let emailUsuario = req.body.email;
  let passwordUsuario = req.body.password;
  if (emailUsuario === "" || passwordUsuario ==="") {
    res.send({
      auth: false,
      token: null,
      message: "Introduzca un email y/o contraseña",
    });
    return;
  }
  let usuario = await Usuario.findOne({ email: emailUsuario }).then(
    (usuarioRegistrado) => {
      return usuarioRegistrado;
    });
  if (!usuario) {
    res.send({
      auth: false,
      token: null,
      message: "*El email proporcionado no existe*",
    });
    return;
  }
  let passwordValida = await bcrypt.compare(passwordUsuario, usuario.password);

  if (passwordValida === false) {
    res.send({
      auth: false,
      token: null,
      message: "*Contraseña incorrecta*",
    });
    return;
  }

  const nuevoToken = jwt.sign({ id: usuario._id }, process.env.SECRET_WORD, {
    expiresIn: expirationTime,
  });

  res.send({ auth: true, token: nuevoToken });
});

authRoutes.get("/homeUsuario", async (req, res) => {
  let myToken = req.headers.token;
  let usuario = await tokenValidation(res, myToken);

  if (!usuario) {
    return;
  }
  res.send({ usuario: usuario, auth: true });
});

authRoutes.put("/editarPerfil/:usuarioId", async (req, res) => {
  const id = req.params.usuarioId;
  const nombreUsuario = req.body.nombre;
  const emailUsuario = req.body.email;
  const passwordUsuario = req.body.password;

  const hashPass = bcrypt.hashSync(passwordUsuario, salt);

  await Usuario
  .findByIdAndUpdate(id, {
    nombre: nombreUsuario,
    email: emailUsuario,
    password: hashPass,
  })
    .then(() => {})
    .catch((error) => {
      res.send(error);
    });
  res.redirect(`/homeUsuario`);
});

module.exports = authRoutes;
