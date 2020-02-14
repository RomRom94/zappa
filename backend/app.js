const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const betsRoutes = require("./routes/bets");

const app = express();

mongoose
  .connect(
    'mongodb://localhost:27017/zappa', {useUnifiedTopology: true,
  useNewUrlParser: true,}
  )
  .then(() => {
    console.log('ça marche');
  })
  .catch(() => {
    console.log('ça marche pas')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/bets", betsRoutes);

module.exports = app;

