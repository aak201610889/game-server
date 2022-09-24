const router = require("express").Router();
const userCtrl = require("../controllers/gameCtrl");
// const auth = require('../middleware/auth');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ``;
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/game",
  upload.fields([
    { name: "images[]", maxCount: 12 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  userCtrl.addGame
);
router.get("/game", userCtrl.getGame);
router.get("/game/:id", userCtrl.getSpecificGame);
// router.put("/:id", userCtrl.updateGame);
// router.delete("/game/:id", userCtrl.deleteGame);

module.exports = router;
