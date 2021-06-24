require("dotenv").config();

const express = require("express");
const authRoutes = express.Router();

// const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Usuario = require("../model/usuario");

const expirationTime = 1800;

// const salt = bcrypt.genSaltSync(10);

authRoutes.post("/signup", async (req, res) => {
  const usuario = req.body.nombre;
  const contraseña = req.body.contraseña;

  if (!usuario || !contraseña ) {
    res.send({
      auth: false,
      token: null,
      message: `Establezca un nombre de usuario y contraseña`,
    });
    return;
  }

  if (contraseña.length < 8) {
    res.send({
      auth: false,
      token: null,
      message: `Por favor, para mayor seguridad, la contraseña debe contener mínimo 8 caracteres`,
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
      message: `Nombre de Usuario ya existente. Pruebe a utilizar otro`,
    });
    return;
  }
 
//   const hashPass = bcrypt.hashSync(contraseña, salt);

  let nuevoUsuario = await Usuario.create({
    nombre: usuario,
    // constraseña: hashPass,
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

  res.send({ auth: true, token: newToken, message:"El usuario se ha creado con exito"});
});
authRoutes.post("/login", async(req, res) => {
  let nombreUsuario = req.body.nombre;
  let contraseñaUsuario = req.body.contraseña;
  let usuario = await Usuario.findOne({nombre: nombreUsuario}).then((foundUser) =>{
    return foundUser;
  });
  if (!user) {
    res.send({
      auth: false,
        token: null,
        message: `El usuario no existe`,
    });
    return;
  }
  let contraseñaValida = await bcrypt.compare(contraseñaUsuario, usuario.contraseña);

  if (contraseñaValida == false) {
    res.send({ auth: false, token: null, message: "Contraseña incorrecta" });
    return;
  }

  const nuevoToken = jwt.sign({ id: usuario._id }, process.env.SECRET_WORD, {
    expiresIn: expirationTime,
  });

  res.send({ auth: true, token: nuevoToken });

authRoutes.get("/privado", async (req, res) => {
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
      "favoritos"
    );
  
    if (!usuario) {
      res.send({
        auth: false, message: "El usuario no existe" });
      return;
    }
  
    res.send(usuario);
  
})
});
module.exports = authRoutes;
