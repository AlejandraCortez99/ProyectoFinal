const express = require("express");
const app = express();
const port = 3000;
const usuarios = require("./rutas/usuarios");
const artistas = require("./rutas/artistas");
require("./basedatos/bd");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", usuarios);
app.use("/", artistas);


app.listen(port, () => {
    console.log(`Servidor a la escucha en el puerto ${port}.`);
  });