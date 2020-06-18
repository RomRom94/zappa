const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

exports.createUser =  (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
}

exports.userUpdate = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  });
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
  User.findByIdAndUpdate(req.params.id,{$set:{email:user.email, firstname:user.firstname, lastname: user.lastname, password: user.password}},{new:true, useFindAndModify: false}).then((docs)=>{
    if(docs) {
      console.log('data modifiées')
    } else {
      console.log('Je suis dans le if docs false')
    }
  }).catch((err)=>{
    console.log(err)
  })
  } else {
    reject({success:"false",data:"provide correct key"});
  }
}

exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
}
