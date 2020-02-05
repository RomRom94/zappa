const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Bet = require("./models/bet");

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
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.post("/api/bets", (req, res, next) => {
    const bet = new Bet({
      title: req.body.title,
      content: req.body.content
    });
    bet.save().then(createdBet => {
      res.status(201).json({
        message: "Bet added successfully",
        betId: createdBet._id
      });
    });
  });

  app.get("/api/bets", (req, res, next) => {
    Bet.find().then(documents => {
      res.status(200).json({
        message: "Bets fetched successfully!",
        bets: documents
      });
    });
  });

  app.delete("/api/bets/:id", (req, res, next) => {
    Bet.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Bet deleted!" });
    });
  });

  module.exports = app;
