var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");

const express = require("express");
const cancionesRouter = express.Router();
const tokenValidation = require("../functions/tokenValidation");
const Usuario = require("../model/usuario");
const Favorito = require("../model/favorito");
// const CancionComentada = require("../model/cancion");
// const Comentario = require("../model/comentario");



cancionesRouter.get("/", (req,res) => {
  res.send({ message: "comprobamos que funciona la ruta raiz" });
});



cancionesRouter.post("/buscarCancion", async (req, res) => {
  console.log(req.body.cancion);
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
   console.log(canciones);
  if (canciones.length > 0) {
    let cancionesFiltradas = [];
    for (let i = 0; i < canciones.length; i++) {
      if (canciones[i].track == cancion) {
        cancionesFiltradas.push(canciones[i]);
      }
      console.log(cancionesFiltradas);
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
    console.log(idCancion, idArtista, idAlbum);

//Mostramos si la cancion está guardada como favorita o no
    let favorito = usuario.favoritos.filter((element) => {
      return element.id_track == idCancion;
    });
    let esFavorito = false;
    if (favorito.length > 0) {
      esFavorito = true;
    }
    console.log(favorito);
    //Mostramos los comentarios que haya en esa cancion
    // let cancionSeleccionada = await CancionComentada.findOne({ idApi: idCancion})
    // .then((element) => {
    //   return element;
    // })
    // let hayComentarios = false;
    // if(cancionSeleccionada.length > 0 ) {
    //   hayComentarios = true;
    // }
    //console.log("En teoría los comentarios se mostrarían")

    let cancion = await happi.music
      .lyrics(idArtista, idAlbum, idCancion)
      .then((response) => {
        console.log(response)
        return response;
      })
      .catch((err) => {
        res.send(err);
      });
    res.send({
      cancion: cancion.response.result,
      favorito: esFavorito //,
      // comentarios: hayComentarios,
    });
  }
);

// Pinchar en el boton correspondiente, que nos guardará la cancion como Fav
cancionesRouter.post(
  "/guardarFavorito/:id_artista/:id_album/:id_cancion",
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
    let idAutor = cancion.response.result.id_artist;
    let idAlbumCover = cancion.response.result.id_album;
    let nuevoFavorito = await Favorito.create({
      id_track: idTrack,
      id_artist:idAutor,
      id_album:idAlbumCover,
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

//Pinchar de nuevo en el boton anterior, quitará la cancion de Favoritos
cancionesRouter.delete(
  "/borrarFavorito/:id_artista/:id_album/:id_cancion",
  async (req, res) => {
    let myToken = req.headers.token;

    let usuario = await tokenValidation(res, myToken);

    if (!usuario) {
      return;
    }
    let idArtista = req.params.id_artista;
    let idAlbum = req.params.id_album;
    let idCancion = req.params.id_cancion;
    
    let favorito = await Favorito.findOne({ idApi: idCancion})
    .then((cancion) => {
      return cancion;
    })
    let id = favorito._id;
    console.log(id);
    let favoritoBorrado = await Favorito.findByIdAndDelete(id)
    .then((element)=>{
      return element;
    });
  
    await Usuario.findByIdAndUpdate(usuario._id, {
      $pull: { favoritos: favoritoBorrado._id },
    });
    // 
    res.redirect(`/cancion/${idArtista}/${idAlbum}/${idCancion}`);
  }
);
// cancionesRouter.post(
//   "/nuevoComentario/:id_artista/:id_album/:id_cancion", //COMENTARIOS SOBRE LA CANCION/LETRA CONCRETA
//   async (req, res) => {
//     let myToken = req.headers.token;

//     let usuario = await tokenValidation(res, myToken);

//     if (!usuario) {
//       return;
//     }
//     let idArtista = req.params.id_artista;
//     let idAlbum = req.params.id_album;
//     let idCancion = req.params.id_cancion;
//     let cancion = await happi.music
//       .lyrics(idArtista, idAlbum, idCancion)
//       .then((response) => {
//         return response;
//       })
//       .catch((err) => {
//         res.send(err);
//       });

//     let idTrack = cancion.response.result.id_track;
//     let Texto = req.body.texto;
//     let nuevoComentario = await Comentario.create({
//       usuario: usuario.nombre,
//       texto: Texto,
//     }).then((comentario) => {
//       return comentario;
//     });

//     await Cancion.findByIdAndUpdate(Cancion.Comentada_id, { //Esto no tiene sentido lol, es un modelo, no tiene id
//       $push: { idApi: idTrack, comentarios: nuevoComentario._id },
//     });
//     res.redirect(`/cancion/${idArtista}/${idAlbum}/${idCancion}`);
//   }
// );
module.exports = cancionesRouter;
