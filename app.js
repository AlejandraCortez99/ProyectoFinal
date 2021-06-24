const express = require("express");
const app = express();
const port = 2550;
const Autentificacion = require("./rutas/autentificacion");
const Artistas = require("./rutas/artistas");
const Albumes = require("./rutas/albumes");
const Canciones = require("./rutas/canciones");
require("./basedatos/bd");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", Autentificacion);
app.use("/", Artistas);
app.use("/", Canciones);
app.use("/", Albumes);


app.listen(port, () => {
    console.log(`Servidor a la escucha en el puerto ${port}.`);
  });
