var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");
const express = require("express");
const artistasRouter = express.Router();

artistasRouter.get("/artistas", async (req, res) => {
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
  let artistasFiltrados = [];
  for (let i = 0; i < artistas.length; i++) {
    if(artistas[i].artist == artista) {
      artistasFiltrados.push(artistas[i]);
    }
  }
  res.send(artistasFiltrados);
});

module.exports = artistasRouter;
