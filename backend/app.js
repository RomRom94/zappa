const express = require('express');
const bodyParser = require('body-parser');

const Bet = require('./models/bet');

const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://localhost:27017/zappa', {useUnifiedTopology: true,
useNewUrlParser: true,}).then(() => {
  console.log('ça marche');
})
  .catch(() => {
    console.log('ça marche pas')
  })


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
  )
  next();
})

app.post("/api/bets", (req, res, next) => {
  const bet = new Bet({
    title: req.body.title,
    content: req.body.content
  });
  console.log(bet);
  res.status(201).json({
    message: 'Bet added successfully'
  });
})

app.get("/api/bets", (req, res, next) => {
  const bets = [
    {
      id: "zfzfz423",
      title: "First server-slide bet",
      content: "Test test test"
    }
  ];
  res.status(200).json({
    message: 'Bets fetched sucessfully',
    bets: bets
  });
});

module.exports = app;
