const express = require('express');

const BetController = require("../controllers/bets");

const checkAuth = require('../middleware/check-auth');
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, BetController.createBet);

router.put("/:id", checkAuth, extractFile, BetController.updateBet);

router.get("", BetController.getBets);

router.get("/:id", BetController.getBet);

router.delete("/:id", checkAuth, BetController.deleteBet);

module.exports = router;

