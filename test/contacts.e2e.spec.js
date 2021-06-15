const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = require("../app");
const db = require("../model/db");
const User = require("../model/user");
const Contact = require("../model/contact");
const Users = require("../repositories/users");
const { newUser, newContact } = require("./data/data");

describe("test routs contacts", () => {
  let user, token;
  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUser.email });
    user = await User.create();
    const SECRET_KEY = process.env.SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user._id }, SECRET_KEY);
    await Users.updateToken(user._id, token);
  });
  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUser.email });
    await mongo.disconnect();
  });
  beforeEach(async () => {
    await Contact.deleteMany({});
  });
  describe("GET request ", () => {
    it("should return 200 to all contacts", async () => {
      const response = await request(app)
        .get("/api/contacts")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.contacts).toBeInstanceOf(Array);
    });
    it("should return 200 to all by id", async () => {
      const contact = await Contact.create({ ...newContact });
      const response = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.contact).toHaveProperty("id");
      expect(response.body.data.id).toBe(String(contact._id));
    });
    it("should return 404 without id", async () => {
      const fakeId = "60afb3f5b937940fe0d2ab9e";
      const response = await request(app)
        .get(`/api/contacts/${fakeId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(404);
      expect(response.body).toBeDefined();
    });
    it("should return 404 wrong id", async () => {});
  });
  describe("Post request ", () => {
    it("should return 201 create contact", async () => {
      const fakeId = "60afb3f5b937940fe0d2ab9e";
      const response = await request(app)
        .post(`/api/contacts/${fakeId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(newContact)
        .set("Accept", "application/json");
      expect(response.status).toEqual(201);
      expect(response.body).toBeDefined();
    });
  });
});
