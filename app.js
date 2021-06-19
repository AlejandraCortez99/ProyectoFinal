const express = require("express");
const app = express();
const port = 2550;
const Usuarios = require("./rutas/usuarios");
const Artistas = require("./rutas/artistas");
const Albumes = require("./rutas/albumes");
const Canciones = require("./rutas/canciones");
const BibliotecaPersonal = require("./rutas/bibliotecaPersonal")
const letras =require("./rutas/letras");

require("./basedatos/bd");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", Usuarios);
app.use("/", Artistas);
app.use("/", Canciones);
app.use("/", Albumes);
app.use("/", Usuarios);
app.use("/", BibliotecaPersonal);
app.use("/", letras);

app.get("/", (req, res) => {
  res.send("PRUEBA DE SI ESTA FUNCIONANDO");
})
app.get("/usuarios", (req, res) => {
  res.send("PRUEBA DE SI ESTA FUNCIONANDO USUARIOS");
})
app.get("/artistas", (req, res) => {
  res.send("PRUEBA DE SI ESTA FUNCIONANDO ARTISTAS");
})
/* app.get("/canciones", (req, res) => {
  res.send(canciones);
}) */
/* app.get("/albumes", (req, res) => {
  res.send("PRUEBA DE SI ESTA FUNCIONANDO ALBUMES");
}) */
app.get("/bibliotecaPersonal", (req, res) => {
  res.send("PRUEBA DE SI ESTA FUNCIONANDO BIBLIOTECA");
})

app.listen(port, () => {
    console.log(`Servidor a la escucha en el puerto ${port}.`);
  });