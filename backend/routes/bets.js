const express = require('express');

const Bet = require("../models/bet");

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post(
  "",
  checkAuth,
  (req, res, next) => {
    const bet = new Bet({
      title: req.body.title,
      content: req.body.content,
    });
    bet.save().then(createdBet => {
      res.status(201).json({
        message: "Bet added successfully",
        bet: {
          ...createdBet,
          id: createdBet._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  checkAuth,
  (req, res, next) => {
    const bet = new Bet({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      userId: req.userData.userId
    });
    Bet.updateOne({ _id: req.params.id}, bet).then(result => {
      if (result.nModified > 0){
        res.status(200).json({ message: 'update'});
      } else {
      res.status(401).json({ message: 'Not authorized'});
      }
    });
  }
);

router.get("", (req, res, next) => {
  Bet.find().then(documents => {
    res.status(200).json({
      message: "Bets fetched successfully!",
      bets: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Bet.findById(req.params.id).then(bet => {
    if (bet) {
      res.status(200).json(bet);
    } else {
      res.status(404).json({ message: "Bet not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Bet.deleteOne({ _id: req.params.id}).then(result => {
    if (result.n > 0){
      res.status(200).json({ message: 'Bet deleted'});
    } else {
    res.status(401).json({ message: 'Not authorized'});
    }
  });
});

module.exports = router;

