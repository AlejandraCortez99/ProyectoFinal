var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");
const express = require("express");
const cancionesRouter = express.Router();
const tokenValidation = require("../functions/tokenValidation");

cancionesRouter.get("/canciones", async (req, res) => {
  let myToken = req.headers.token;

  let usuario = await tokenValidation(res, myToken);

  if (!usuario) {
    return;
  }
  let cancion = req.body.cancion;
  let canciones = await happi.music
    .search(cancion, 40 | 100)
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
  if (canciones.length > 0) {
    let cancionesFiltradas = [];
    for (let i = 0; i < canciones.length; i++) {
      console.log(canciones[i]);
      if (canciones[i].track == cancion) {
        cancionesFiltradas.push(canciones[i]);
      }
    }
    res.send(cancionesFiltradas);
  } else {
    res.send({
      message: `No se han encontrado resultados para la busqueda: ${cancion}`,
    });
  }
});
cancionesRouter.get("/cancion/:id_artista/:id_album/:id_cancion",
  async (req, res) => {
    let myToken = req.headers.token;

    let usuario = await tokenValidation(res, myToken);

    if (!usuario) {
      return;
    }
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
  }
);

cancionesRouter.post("/cancionFavorita/:id_cancion", (req, res) => {
  let cancionFavorita = req.params.id_cancion;
  console.log(cancionFavorita);
  res.send(cancionFavorita);
});
// cancionesRouter.post("/cancionFavorita/:id_cancion"
// });

module.exports = cancionesRouter;
