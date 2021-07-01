var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");
const express = require("express");
const artistasRouter = express.Router();
const tokenValidation = require("../functions/tokenValidation");

artistasRouter.get("/buscarArtista", async (req, res) => {
  let myToken = req.headers.token;

  let usuario = await tokenValidation(res, myToken);

  if (!usuario) {
    return;
  }
  let artista = req.body.artista;
  let artistas = await happi.music
    .search(artista, 40)
    .then((response) => {
      return response;
    })
    .then((info) => {
      let data = info.response.result;
      return data;
    })
    .catch((error) => {
      res.send(error);
    });
  if (artistas.length > 0) {
    let artistasFiltrados = [];
    for (let i = 0; i < artistas.length; i++) {
      if (artistas[i].artist == artista) {
        artistasFiltrados.push(artistas[i]);
      }
    }

    res.send(artistasFiltrados);
  } else{
    res.send({
      message: `No se han encontrado resultados para la busqueda: ${artista}`,
    });
  }
});

artistasRouter.get("/artista/:id_artista", async (req, res) => {
  let myToken = req.headers.token;

  let usuario = await tokenValidation(res, myToken);

  if (!usuario) {
    return;
  }
  console.log(req.params);
  let idArtista = req.params.id_artista;
  res.redirect(`/albumes/${idArtista}`)
});


module.exports = artistasRouter;
