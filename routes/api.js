var express = require("express");
var router = express.Router();
const Character = require("../models/Character.js");
const Score = require("../models/Score");

/* GET Scores */
router.get("/scores", async (req, res, next) => {
  try {
    const sortedScores = await Score.find().sort({ time: 1 });
    res.json(sortedScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET Characters */
router.get("/characters", async (req, res, next) => {
  try {
    const allCharacters = await Character.find();
    res.json(allCharacters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* POST Characters */
router.post("/characters", async (req, res, next) => {
  const character = new Character({
    name: "superman",
    x: 1,
    y: 1,
  });
  try {
    const result = await character.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* POST Score */
router.post("/scores", async (req, res, next) => {
  const score = new Score({
    username: req.body.username,
    time: req.body.time,
  });
  try {
    const result = await score.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
