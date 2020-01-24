const express = require('express');

const app = express();

app.use("/api/bets", (req, res, next) => {
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
