var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");
const express = require("express");
const albumesRouter = express.Router();
const tokenValidation = require("../functions/tokenValidation");

albumesRouter.get("/albumes/:id_artista", async (req, res) => {
  let myToken = req.headers.token;

  let usuario = await tokenValidation(res, myToken);

  if (!usuario) {
    return;
  }
  console.log(req.params);
  let idArtista = req.params.id_artista;
  let albums = await happi.music
    .albums(idArtista)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      res.send(err);
    });
  res.send({albums: albums.response.result, id_artist: idArtista});
});
albumesRouter.get("/cancionesAlbum/:id_artista/:id_album", async (req, res) => {
  let myToken = req.headers.token;

  let usuario = await tokenValidation(res, myToken);

  if (!usuario) {
    return;
  }
  console.log(req.params);
  let idArtista = req.params.id_artista;
  let idAlbum = req.params.id_album;
  let cancionesAlbum = await happi.music
    .tracks(idArtista, idAlbum)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      res.send(err);
    });
  res.send(cancionesAlbum.response.result);
});
module.exports = albumesRouter;
