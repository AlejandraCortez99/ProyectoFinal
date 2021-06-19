var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");
const express = require("express");
const cancionRouter = express.Router();

cancionRouter.get("/cancion/:id_artista/:id_album/:id_cancion", async (req, res) => {
  console.log(req.params);
  let idArtista = req.params.id_artista;
  let idAlbum = req.params.id_album;
  let idCancion = req.params.id_cancion;
  let cancion = await happi.music
    .lyrics(idArtista, idAlbum, idCancion)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      res.send(err);
    });
  res.send(cancion.response.result);

});
cancionRouter.post("/cancionFavorita/:id_cancion", (req, res) => {
  let cancionFavorita = req.params.id_cancion;
  console.log(cancionFavorita);
  res.send("ruta terminada");

});
module.exports = cancionRouter;
