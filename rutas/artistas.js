var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");
const express = require("express");
const artistasRouter = express.Router();
const tokenValidation = require("../functions/tokenValidation");

artistasRouter.post("/buscarArtista", async (req, res) => {
  let myToken = req.headers.token;

  let usuario = await tokenValidation(res, myToken);

  if (!usuario) {
    return;
  }
  let artista = req.body.artista;
  let artistas = await happi.music
    .search(artista, 40 | 100)
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
    console.log(artistasFiltrados);
    let artistasUnicos = [];
    for (let i = 0; i < artistasFiltrados.length; i++) {
      if (artistasUnicos.length == 0) {
        artistasUnicos.push(artistasFiltrados[i]);
      } else {
        let esDiferente = true;
        for (let j = 0; j < artistasUnicos.length; j++) {
          if(artistasUnicos[j].id_artist == artistasFiltrados[i].id_artist){
            esDiferente = false;
          }
        }
        if(esDiferente == true){
          artistasUnicos.push(artistasFiltrados[i]);
        }
      }
    }
    // let names = artistasFiltrados.map(function (person) {
    //   return person;
    // });
    // var sorted = names.sort();
    // console.log(sorted);
    // var unique = sorted.filter(function (value, index) {
    //   return value !== sorted[index + 1];
    // });
    // console.log(unique);

    res.send(artistasUnicos);
  } else {
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
  res.redirect(`/albumes/${idArtista}`);
});

module.exports = artistasRouter;
