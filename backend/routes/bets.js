const express = require('express');
const multer = require("multer");

const Bet = require("../models/bet");

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    console.log(req.body)
    const bet = new Bet({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId,
      dateEnd: req.body.dateEnd,
      type: req.body.type,
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
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const bet = new Bet({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      userId: req.userData.userId,
      type: req.body.type,
    });
    Bet.updateOne({ _id: req.params.id, creator: req.userData.userId }, bet).then(result => {
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
  Bet.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0){
      res.status(200).json({ message: 'Bet deleted'});
    } else {
    res.status(401).json({ message: 'Not authorized'});
    }
  });
});

module.exports = router;

