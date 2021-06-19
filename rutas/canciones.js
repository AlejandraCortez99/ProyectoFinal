var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");
const express = require("express");
const cancionesRouter = express.Router();

cancionesRouter.get("/canciones", async (req, res) => {
  let cancion = req.body.cancion;
  let canciones = await happi.music
    .search(cancion, 40)
    .then((response) => {
      return response;
    })
    .then((info) => {
      let data = info.response.result;
      return data;
    })
    .catch((error) => {
      console.log("Error", error);
    });
  let cancionesFiltradas = [];
  for (let i = 0; i < canciones.length; i++) {
    console.log(canciones[i]);
    if (canciones[i].track == cancion) {
      cancionesFiltradas.push(canciones[i]);
    }
  }
  res.send(cancionesFiltradas);
});


module.exports = cancionesRouter;
