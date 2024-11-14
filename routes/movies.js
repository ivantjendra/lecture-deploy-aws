const express = require("express");
const router = express.Router();

const MovieController = require("../controllers/movieController");
const authorization = require('../middlewares/authorization')

//! Multer
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

router.post("/", MovieController.addMovie);

router.get("/", MovieController.getAllMovies);

// router.use(authorization) //! Penulisan seperti ini tidak bisa akses req.params
// router.use('/:id', authorization)

router.delete("/:id", authorization, MovieController.deleteMovie); //! <<-- kena authorization

router.get('/tmdb', MovieController.getFromTmdb)

router.patch('/:id', upload.single('avatar'), MovieController.uploadImage)

module.exports = router;
