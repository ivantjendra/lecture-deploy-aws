const { Movie } = require("../models/");
const axios = require("axios");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log(process.env, '<--')

class MovieController {
  static async getAllMovies(req, res, next) {
    try {
      const movies = await Movie.findAll();

      res.status(200).json(movies);
    } catch (err) {
      next(err);
    }
  }

  static async addMovie(req, res, next) {
    try {
      const { title, synopsis, imgUrl, rating } = req.body;
      // userId / authorId tidak diambil dari req.body

      const newMovie = await Movie.create({
        title,
        synopsis,
        imgUrl,
        rating,
        userId: req.user.id,
      });

      res.status(201).json(newMovie);
    } catch (err) {
      next(err);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      await Movie.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({
        message: "Delete success",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getFromTmdb(req, res, next) {
    try {
      // Di sini kita harus ambil data ke 3rd party, dibantu sama axios
      const { data } = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDJmYWJiZTI1ZDEzODRkNDZlOTY5NjkxNDhmMWRhYyIsIm5iZiI6MTczMTM5MjE0MS4xNjM3MDE4LCJzdWIiOiI2NTY0OGU4ZWIyMzRiOTAxMzkyOGJhZGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.x2c5G2-rKy_51YWzkp_8WUl00D4JoPnNi69ItsqYtmA",
        },
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async uploadImage(req, res, next) {
    try {
      const b64File = Buffer.from(req.file.buffer).toString('base64')

      const dataURI = `data:${req.file.mimetype};base64,${b64File}`

      const uploadFile = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
        folder: 'rmt55',
      })

      const imgUrl = uploadFile.secure_url

      const update = await Movie.update({
        imgUrl
      }, {
        where: {
          id: req.params.id
        }
      })

      res.status(200).json({
        message: `Upload image success. Here's the url: ${uploadFile.secure_url}`
      })
    } catch (err) {
      console.log(err, '<-- err')
      next(err);
    }
  }
}

module.exports = MovieController;
