require('dotenv').config();

const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@aleluyalyrics.3qtha.mongodb.net/lyricsbd?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Estamos conectados a la base de datos.");
  })
  .catch((error) => {
    console.log("error al conectar", error);
  });


