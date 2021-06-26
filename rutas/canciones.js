var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");
const express = require("express");
const cancionesRouter = express.Router();
const tokenValidation = require("../functions/tokenValidation");
const Usuario = require("../model/usuario");
const Favorito = require("../model/Favorito");

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
cancionesRouter.get(
  "/cancion/:id_artista/:id_album/:id_cancion",
  async (req, res) => {
    let myToken = req.headers.token;

    let usuario = await tokenValidation(res, myToken);

    if (!usuario) {
      return;
    }
    let idCancion = req.params.id_cancion;
    let idArtista = req.params.id_artista;
    let idAlbum = req.params.id_album;

    let favorito = usuario.favoritos.filter((element)=>{
      return element.idApi == idCancion;
    });
    let esFavorito = false;
    if (favorito.length > 0 ) {
      esFavorito = true;
    }
    console.log(favorito);

    let cancion = await happi.music
      .lyrics(idArtista, idAlbum, idCancion)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        res.send(err);
      });
    res.send({ cancion: cancion.response.result, favorito: esFavorito });
  }
);

cancionesRouter.post(
  //"/cancionFavorita/:titulo/:autor/:album/:id_artista/:id_album/:id_cancion",
  "/cancionFavorita/:id_artista/:id_album/:id_cancion",
  async (req, res) => {
    let myToken = req.headers.token;

    let usuario = await tokenValidation(res, myToken);

    if (!usuario) {
      return;
    }
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
    let titulo = cancion.response.result.track;
    let autor = cancion.response.result.artist;
    let album = cancion.response.result.album;
    let idTrack = cancion.response.result.id_track;
    let nuevoFavorito = await Favorito.create({
      idApi: idTrack,
      titulo: titulo,
      autor: autor,
      album: album,
    }).then((favorito) => {
      return favorito;
    });

    await Usuario.findByIdAndUpdate(usuario._id, {
      $push: { favoritos: nuevoFavorito._id },
    });
    res.redirect(`/cancion/${idArtista}/${idAlbum}/${idCancion}`);
  }
);
// cancionesRouter.post("/cancionFavorita/:id_cancion"
// });

module.exports = cancionesRouter;
