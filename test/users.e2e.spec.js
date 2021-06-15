const request = require("supertest");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
require("dotenv").config();

const app = require("../app");
const db = require("../model/db");
const User = require("../model/user");

const Users = require("../repositories/users");
const { newTestUser } = require("./data/data");

jest.mock("cloudinary");

describe("test routs contacts", () => {
  let token;
  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newTestUser.email });
  });
  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newTestUser.email });
    await mongo.disconnect();
  });
  it("Register user", async () => {
    const response = await request(app)
      .post(`/api/users/register`)
      .send(newTestUser)
      .set("Accept", "application/json");
    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
  });
  it("Create 409 user", async () => {
    const response = await request(app)
      .post(`/api/users/register`)
      .send(newTestUser)
      .set("Accept", "application/json");
    expect(response.status).toEqual(409);
    expect(response.body).toBeDefined();
  });
  it("Login  user", async () => {
    const response = await request(app)
      .post(`/api/users/login`)
      .send(newTestUser)
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    token = response.body.data.token;
  });
  it("Wrong user", async () => {});
  it("Upload avatar user", async () => {
    const buf = await fs.readFile("./test/data/avatar-jPPg10Sb7ZsDYpEB.jpg");
    const response = await request(app)
      .patch("/api/users/avatars")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", buf, "avatar-jPPg10Sb7ZsDYpEB.jpg");
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.data.avatarUrl).toEqual("secure_url");
  });
});
