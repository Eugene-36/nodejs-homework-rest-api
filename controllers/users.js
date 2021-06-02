const Users = require("../repositories/users");

const register = async (req, res, next) => {
  try {
    const contacts = await Users.listContacts();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const contacts = await Users.listContacts();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const contacts = await Users.listContacts();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout };
