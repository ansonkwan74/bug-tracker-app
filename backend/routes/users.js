const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  //Gets a list of all users from the MongoDB Atlas
  User.find()
    .then((users) => res.json(users)) //Returns users in json format
    .catch((err) => res.status(400).json("Error: " + err)); //Returns status 400 if error is caught
});

//For creating new User json object which contains all fields
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  //New user is added to the database
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
