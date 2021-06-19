var happi = require("happi-dev-sdk");
happi.init("1b2680PzWtH40vWogZoMu14YUuwc72fR99Ig0ufTbcZf6lL3eAau1AxV");
const express = require("express");
const router = express.Router();

router.post("/albumes", async (req, res) => {
  let album = req.body.album;
  let albumes = await happi.music
    .search(album, 40)
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
  let albumesFiltrados = [];
  for (let i = 0; i < albumes.length; i++) {
    console.log(albumes[i]);
    if (albumes[i].album == album) {
      albumesFiltrados.push(albumes[i]);
    }
  }
  res.send(albumesFiltrados);
});

module.exports = router;
