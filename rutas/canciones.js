var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");

const express = require("express");
const cancionesRouter = express.Router();
const tokenValidation = require("../functions/tokenValidation");
const Usuario = require("../model/usuario");
const Favorito = require("../model/Favorito");
const CancionComentada = require("../model/Cancion");
const Comentario = require("../model/comentario");
const Cancion = require("../model/Cancion");

cancionesRouter.get("/buscarCancion", async (req, res) => {
  let myToken = req.headers.token;

  let usuario = await tokenValidation(res, myToken);

  if (!usuario) {
    return;
  }
  let cancion = req.body.cancion;
  let canciones = await happi.music
    .search(cancion, 40 | 200)
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
    //Mostrar si la cancion está gusrada como favorita o no
    let favorito = usuario.favoritos.filter((element) => {
      return element.idApi == idCancion;
    });
    let esFavorito = false;
    if (favorito.length > 0) {
      esFavorito = true;
    }
    console.log(favorito);

    //Mostrar los comentarios que haya en esa cancion
    // let cancionSeleccionada = CancionComentada.filter((element) => {
    //   return element.idApi == idCancion;
    // });

    // let comentariosDejados = cancionSeleccionada.comentarios;
    // if(cancionComentada.length > 0 ) {
    //   return comentariosDejados;
    // }
    // console.log("EN TEORIA LOS COMENTARIOS SE MOSTRARIAN")

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
      //comentarios: comentariosDejados,
    });
  }
);

cancionesRouter.post(
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

cancionesRouter.delete(
  "/borrarCancionFavorita/:id_artista/:id_album/:id_cancion",
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
//   "/publicarComentario/:id_artista/:id_album/:id_cancion", //COMENTARIOS SOBRE LA CANCION/LETRA CONCRETA
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
//     let Texto = req.body.texto;
//     let idTrack = cancion.response.result.id_track;
//     let nuevoComentario = await Comentario.create({
//       usuario: usuario.nombre,
//       texto: Texto,
//     }).then((comentario) => {
//       return comentario;
//     });

//     await Cancion.findByIdAndUpdate(Cancion._id, {
//       $push: { idApi: idTrack, comentarios: nuevoComentario._id },
//     });
//     res.redirect(`/cancion/${idArtista}/${idAlbum}/${idCancion}`);
//   }
// );
module.exports = cancionesRouter;
