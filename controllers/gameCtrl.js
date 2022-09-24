const Game = require("../models/gameModel");

const userCtrl = {
  addGame: async (req, res) => {
    try {
      console.log(req.files);
      const {
        nameEn,
        nameAr,
        shortdescEn,
        shortdescAr,
        mainpage,
        cpu,
        ram,
        gpu,
        rate,
        youtube,
        date,
      } = req.body;
      const backgroundImage = req.files.backgroundImage[0].originalname;
      const images = req.files["images[]"].map((item) => item.originalname);

      const game = await Game.findOne({ nameEn });
      if (game) {
        return res.status(400).json({
          msg: "Game already exists",
        });
      }
      console.log(backgroundImage);

      const newGame = await Game({
        nameEn,
        nameAr,
        shortdescEn,
        shortdescAr,
        backgroundImage,
        images,
        mainpage,
        cpu,
        ram,
        gpu,
        rate,
        youtube,
        date,
      });
      await newGame.save();

      res.send(newGame);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getGame: async (req, res) => {
    try {
      const game = await Game.find();
      if (!game) {
        return res.status(400).json({ msg: "thers is no game" });
      }
      res.json(game);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getSpecificGame: async (req, res) => {
    try {
      const id = req.params.id;
      const game = await Game.find({ _id: id });
      if (!game) {
        return res.status(400).json({ msg: "thers is no game" });
      }
      res.json(game);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
