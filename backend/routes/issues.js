const router = require("express").Router();
let Issue = require("../models/issue.model");
const { route } = require("./users");

router.route("/").get((req, res) => {
  Issue.find()
    .then((issues) => res.json(issues))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = new Date();
  const deadline = Date.parse(req.body.deadline);
  const completed = req.body.completed;
  const completionDate = new Date();

  const newIssue = new Issue({
    username,
    description,
    date,
    deadline,
    completed,
    completionDate,
  });

  newIssue
    .save()
    .then(() => res.json("Issue added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Issue.findById(req.params.id)
    .then((issue) => res.json(issue))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Issue.findByIdAndDelete(req.params.id)
    .then(() => res.json("Issue deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Issue.findById(req.params.id)
    .then((issue) => {
      issue.username = req.body.username;
      issue.description = req.body.description;
      issue.date = Date.parse(req.body.date);
      issue.deadline = Date.parse(req.body.deadline);
      issue.completed = req.body.completed;
      issue.completionDate = Date.parse(req.body.completionDate);

      issue
        .save()
        .then(() => res.json("Issue updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
