const request = require("supertest");

const app = require("../app");

const { sequelize } = require('../models/');
const { hashPass } = require("../helpers/bcrypt");
const { queryInterface } = sequelize

beforeAll(async () => {
  const users = [
    {
      email: "lisa@mail.com",
      password: hashPass("lisa"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  await queryInterface.bulkInsert("Users", users, {})
})

afterAll(async () => {
  await queryInterface.bulkDelete("Users", {}, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })
})

describe("POST /register", () => {
  describe("Success register", () => {
    test("Success 200 OK", async () => {
      const res = await request(app).post("/register").send({
        email: "jisoo@mail.com",
        password: "jisoo",
      });
      
      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty("id", expect.any(Number))
      expect(res.body).toHaveProperty("email", "jisoo@mail.com")

    });
  });

  describe('Failed register', () => {
    test('Failed 400 null email', async () => {
      const res = await request(app).post('/register').send({
        password: "jisoo"
      })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty("message", "Email is required ya")

    })

    test('Failed 400 empty email', async () => {
      const res = await request(app).post('/register').send({
        email: "",
        password: "jisoo"
      })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty("message", "Email is required ya")
    })

    test('Failed 400 wrong email format', async () => {
      const res = await request(app).post('/register').send({
        email: "jisoo",
        password: "jisoo"
      })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty("message", "Harus format email ya")
    })
  })
});

describe('POST /login', () => {
  describe('Success Login', () => {
    test('Success 200 OK', async () => {
      const res = await request(app).post('/login').send({
        email: "lisa@mail.com",
        password: "lisa"
      })
      console.log(res.body, '<--')
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("access_token", expect.any(String))
    })
  })
})
