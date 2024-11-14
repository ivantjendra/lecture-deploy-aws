const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/");

class UserController {
  static async register(req, res, next) { //! <-- Jangan lupa terima next
    try {
      const { email, password } = req.body;
  
      const newUser = await User.create({
        email,
        password,
        role: "Staff", // Bisa di sini atau defaultValue di model
      });
  
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      // err di sini akan menerima apapun yang di throw pada try
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      // 1. Check dulu email dan password nya ada atau tidak?
      const { email, password } = req.body

      console.log(req.body, '<--- req.body')
      if(!email) {
        throw { name: "EmailRequired" }
      }

      if(!password) {
        throw { name: "PasswordRequired" }
      }

      // 2. Cari usernya berdasarkan email dari req.body
      const user = await User.findOne({
        where: {
          email
        }
      })

      if(!user) {
        throw { name: "Unauthenticated" }
      }

      // 3. Compare password dari req.body dengan password dari user yang berhasil di find
      const compared = comparePass(password, user.password)

      if(!compared) {
        throw { name: "Unauthenticated" }
      }

      // 4. Buat token nya dengan menyimpan id user yang login
      const access_token = signToken({ id: user.id })

      res.status(200).json({ access_token })
    } catch(err) {
      next(err)
    }
  }
}

module.exports = UserController