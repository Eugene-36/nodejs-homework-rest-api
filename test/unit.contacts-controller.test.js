const { update } = require("../controllers/contacts");
const Contacts = require("../repositories/contacts");

jest.mock("../repositories/contacts");

describe("Unit test controller contacts", () => {
  const req = { user: { id: 1 }, body: {}, params: { id: 1 } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  };
  const next = jest.fn();
  it("test update contact exist", async () => {
    const contact = {
      id: 3,
      name: "Logan",
      email: "logan@sdsad",
      phone: "111-445-855",
    };
    Contacts.update = jest.fn(() => {
      return contact;
    });
    const result = await update(req, res, next);
    console.log(result);
    expect(result).toBeDefined();
    expect(result.status).toEqual("success");
    expect(result.code).toEqual(200);
    expect(result.data.contact).toEqual(contact);
  });

  it(" update without contact in DB", async () => {
    Contacts.update = jest.fn();
    const result = await update(req, res, next);
    expect(result).toBeDefined();
    expect(result.status).toEqual("error");
    expect(result.code).toEqual(404);
    expect(result.message).toEqual("Not Found");
  });

  it(" update  contact repositories Error", async () => {
    Contacts.update = jest.fn(() => {
      throw new Error("pppp");
    });
    await update(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
