const express = require("express");
const app = express();
const port = 3000;
const usuarios = require("./rutas/usuarios");
const artistas = require("./rutas/artistas");
const albumes = require("./rutas/albumes");
const canciones =require("./rutas/canciones");
const letras =require("./rutas/letras");
require("./basedatos/bd");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", usuarios);
app.use("/", artistas);
app.use("/", canciones);
app.use("/", albumes);
app.use("/", letras);

app.listen(port, () => {
    console.log(`Servidor a la escucha en el puerto ${port}.`);
  });