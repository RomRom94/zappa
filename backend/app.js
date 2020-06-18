const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const betsRoutes = require("./routes/bets");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect('mongodb+srv://RomRom94:' + process.env.MONGO_ATLAS_PW + '@zappa-cpskz.mongodb.net/zappa?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/bets", betsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;

