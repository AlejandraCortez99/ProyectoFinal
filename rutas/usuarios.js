const express = require("express");
const router = express.Router();


router.get("/comprobandoUsuarios", (req, res) =>{
    res.send("comprobandoUsuarios");
})


/* app.get("/Usuarios", async (req,res) => {
    let usuarios = await Usuario.find().then((usuariosGuardados) => {
      return usuariosGuardados;
    });
    res.send(usuarios);
  });
  app.post("/nuevoUsuario", async (req,res) => {
     let nombreUsuario = req.body.nombre;
    let emailUsuario = req.body.email;
    let contraseñaUsuario = req.body.contraseña;
    let bibliotecaUsuario = req.body.bibliotecaPersonal;
    let nuevoUsuario = await Usuario.create({
      nombre: nombreUsuario,
      email: emailUsuario,
      contraseña: contraseñaUsuario,
      bibliotecaPersonal: bibliotecaUsuario,
    }).then((usuarioNuevo) => {
      return usuarioNuevo;
    }).catch((error) =>{
      res.send(`Error: ${error}`);
    })
    res.send(usuarioNuevo);
  })
  
  app.put("/editarperfil"), async (req, res) => {
  
  
  } */

module.exports = router;

