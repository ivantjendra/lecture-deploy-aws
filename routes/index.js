const express = require("express");
const router = express.Router();

const movieRouter = require("./movies");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.get("/", (req, res) => {
  res.send({ message: "App running" });
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// router.get('/pub/movies') //! Yang public di atas authentication karena tidak harus login dulu

router.use(authentication);

// router.use('/movies', middle) //! Semua yang ada di movieRouter kena middleware
router.use("/movies", movieRouter);

module.exports = router;
