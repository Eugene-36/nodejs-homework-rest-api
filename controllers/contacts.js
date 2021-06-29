const Contacts = require("../repositories/contacts");
const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs: contacts, ...rest } = await Contacts.listContacts(
      userId,
      req.query
    );
    return res.json({
      status: "success",
      code: 200,
      data: { contacts, ...rest },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      console.log(contact);
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "errro", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact(userId, req.body);
    res.status(201).json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    }
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({ status: "errro", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(req.body);
    const updated = await Contacts.updateContact(
      userId,
      req.params.id,
      req.body
    );

    if (updated) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact updated.",
        data: { updated },
      });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
