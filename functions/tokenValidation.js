require("dotenv").config();
const jwt = require("jsonwebtoken");
const Usuario = require("../model/usuario");


let tokenValidation = async (response, token) => {
  let validationResult = {};

  if (!token) {
    response.send({
      auth: false,
      token: null,
      message: `Not valid token.`,
    });
    return;
  }

  try {
    validationResult = jwt.verify(token, process.env.SECRET_WORD);
  } catch (error) {
    response.send({
      auth: false,
      token: null,
      message: `Not valid token.`,
    });
    return;
  }

  let usuario = await Usuario.findById(validationResult.id, { password: 0 }).populate("favoritos");

  if (!usuario) {
    response.send({
      auth: false,
      message: "El usuario no existe.",
    });
    return;
  }

  return usuario;
};

module.exports = tokenValidation;