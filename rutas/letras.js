var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");
const express = require("express");
const router = express.Router();

router.post("/letras", async (req, res) => {
    let  // 1º Id artista, 2º Id album, 3º Id cancion
    .lyrics()
  /* let artista = req.body.artista;
  let idArtista = await happi.music
    .search(artista, 40)
    .then((response) => {
      return response;
    })
    .then((info) => {
      let data = info.response.result[0].id_artist;
      return data;
    })
    .catch((error) => {
      console.log("Error", error);
    });
  let filtroId = [];
  for (let i = 0; i < idArtista.length; i++) {
    console.log(idArtista[i]);
    if (idArtista[i].artist == artista) {
      filtroId.push(idArtista[i]);
    } 
  }
  res.send(filtroId);*/
});

module.exports = router;
