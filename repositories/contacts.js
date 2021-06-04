const Contact = require("../model/contact");

// const listContacts = async (userId) => {
//   const results = await Contact.find({ owner: userId }).populate({
//     path: "owner",
//     select: "name email phone gender -_id",
//   });

//   return results;
// }; // getAll

const listContacts = async (userId) => {
  const results = await Contact.find({ owner: userId });
  return results;
};
const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId });
  return result;
}; // getByID

const removeContact = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create({ owner: userId, ...body });
  return result;
}; // create new

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: false }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
