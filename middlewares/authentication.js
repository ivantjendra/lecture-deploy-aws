const { User } = require("../models/");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    // 1. Cek token nya ada atau tidak? token dikirim melalui headers dengan standard Bearer token
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw { name: "Unauthorized" };
    }

    // 2. Pisahkan string Bearer dengan token, lalu verifikasi tokennya.
    const token = bearerToken.split(" ")[1];
    const verified = verifyToken(token); //! Ini jika gagal verify, jwt otomatis throw error dengan nama "JsonWebTokenError"

    // 3. Cari usernya. Ada atau tidak di db?
    const user = await User.findByPk(verified.id);

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (err) {
    console.log(err.name, '<--- ini di authentication');
    next(err)
    // if (err.name === "Unauthorized" || err.name === "JsonWebTokenError") {
    //   res.status(401).json({
    //     message: "Invalid token",
    //   });
    // } else {
    //   res.status(500).json({
    //     message: "Internal Server Error",
    //   });
    // }
  }
};

module.exports = authentication;
