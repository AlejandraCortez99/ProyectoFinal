require("dotenv").config();

const express = require("express");
const authRoutes = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Usuario = require("../model/usuario");

const minPassLength = 8;

const expirationTime = 1800;

const salt = bcrypt.genSaltSync(10);

authRoutes.post("/signup", async (req, res) => {
  const usuario = req.body.nombre;
  const email = req.body.email
  const contraseña = req.body.contraseña;

  if (!usuario || !email || !contraseña ) {
    res.send({
      auth: false,
      token: null,
      message: `Establezca un nombre de usuario y contraseña`,
    });
    return;
  }

  if (contraseña.length < minPassLength) {
    res.send({
      auth: false,
      token: null,
      message: `Por favor, para mayor seguridad, la contraseña debe contener mínimo 8 carácteres`,
    });
    return;
  }

  let foundUsario = await Usuario.findOne({ nombre: usuario }).then(
    (repeatedUser) => {
      return repeatedUser;
    }
  );

  if (foundUsario != null) {
    res.send({
      auth: false,
      token: null,
      message: `Nombre de Usuario ya existente. Pruebe con otro`,
    });
    return;
  }

  const hashPass = bcrypt.hashSync(pass, salt);

  let nuevoUsuario = await Usuario.create({
    nombre: usuario,
    constraseña: hashPass,
    bibliotecaPersonal: [],
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

  res.send({ auth: true, token: newToken });
});

authRoutes.post("/login", async (req, res) => {
  let nombre = req.body.nombre;
  let contraseña = req.body.contraseña;

  let usuario = await Usuario.findOne({ nombre: nombre }).then((userFound) => {
    return userFound;
  });

  if (!usuario) {
    res.send({
      auth: false,
      token: null,
      message: "El usuario proporcionado no existe"
    });
    return;
  }

  let contraseñaValida = await bcrypt.compare(contraseña, user.contraseña);

  if (contraseñaValida == false) {
    res.send({ auth: false, token: null, message: "Contraseña incorrecta" });
    return;
  }

  const newToken = jwt.sign({ id: usuario._id }, process.env.SECRET_WORD, {
    expiresIn: expirationTime,
  });

  res.send({ auth: true, token: newToken });
});

authRoutes.get("/privaDO", async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send({
      auth: false,
      message: "Token no proporcionado",
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.SECRET_WORD)

  const usuario = await Usuario.findById(decoded.id, { contraseña: 0 }).populate(
    "biblioteca personal"
  );

  if (!usuario) {
    res.send({
      auth: false, message: "El usuario no existe" });
    return;
  }

  res.send(usuario);
});


module.exports = authRoutes;
