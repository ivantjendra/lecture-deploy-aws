const { Movie } = require("../models/");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw { name: "NotFound" };
    }

    //! Untuk challenge harus mempertanyakan role juga ya
    //! Jika admin boleh lanjut
    //! Jika staff harus cek itu miliknya atau bukan
    if(movie.userId !== req.user.id) {
      throw { name: "Forbidden" }
    }

    next()
  } catch (err) {
    next(err)
  }
};

module.exports = authorization