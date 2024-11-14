const request = require("supertest");

const app = require("../app");

const { sequelize } = require("../models/");
const { hashPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let adminToken;
let staffToken;

beforeAll(async () => {
  const users = [
    {
      email: "lisa@mail.com",
      password: hashPass("lisa"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: "jisoo@mail.com",
      password: hashPass("jisoo"),
      role: "staff",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await queryInterface.bulkInsert("Users", users, {});

  adminToken = signToken({ id: 1 });
  staffToken = signToken({ id: 2 });

  //! ----- Harus seeding secondary entity juga

  let movies = require("../data/movies.json");

  movies = movies.map((movie) => {
    movie.createdAt = new Date();
    movie.updatedAt = new Date();
    return movie;
  });

  await queryInterface.bulkInsert("Movies", movies, {});
});

afterAll(async () => {
  await queryInterface.bulkDelete(
    "Movies",
    {},
    {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    }
  );

  await queryInterface.bulkDelete(
    "Users",
    {},
    {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    }
  );
});

describe("POST /movies", () => {
  describe("Success add movie", () => {
    test("Success 200 OK", async () => {
      const res = await request(app)
        .post("/movies")
        .send({
          title: "John Constantine",
          synopsis: "Bagus",
          imgUrl: "Gambar",
          rating: 10,
        })
        .set({
          authorization: `Bearer ${adminToken}`,
        });

      console.log(res.body, "<--- create movie");
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("title", "John Constantine");
      expect(res.body).toHaveProperty("synopsis", "Bagus");
      expect(res.body).toHaveProperty("imgUrl", "Gambar");
      expect(res.body).toHaveProperty("rating", 10);
      expect(res.body).toHaveProperty("userId", 1);
    });
  });

  describe("Failed add movie", () => {
    test("Failed 401 no access token", async () => {
      const res = await request(app).post("/movies").send({
        title: "John Constantine 2",
        synopsis: "Bagus",
        imgUrl: "Gambar",
        rating: 10,
      });

      console.log(res.body, "<--- 401 no access token");
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid token");
    });
  });
});

describe("GET /movies", () => {
  describe("Success get all movies", () => {
    test("Success 200 OK get Movies", async () => {
      const res = await request(app)
        .get("/movies")
        .set({
          authorization: `Bearer ${adminToken}`,
        });
        console.log(res.body, '<--- get all movies')
        expect(res.status).toBe(200)
        expect(res.body[0]).toBeInstanceOf(Object)
        expect(res.body[0]).toHaveProperty('title', expect.any(String))
        expect(res.body[0]).toHaveProperty('synopsis', expect.any(String))
        expect(res.body[0]).toHaveProperty('imgUrl', expect.any(String))
        expect(res.body[0]).toHaveProperty('rating', expect.any(Number))
        expect(res.body[0]).toHaveProperty('userId', expect.any(Number))
    });
  });
});


