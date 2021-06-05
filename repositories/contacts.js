const Contact = require("../model/contact");

// const listContacts = async (userId) => {
//   const results = await Contact.find({ owner: userId }).populate({
//     path: "owner",
//     select: "name email phone gender -_id",
//   });

//   return results;
// }; // getAll

const listContacts = async (userId, query) => {
  // const results = await Contact.find({});
  const {
    SortBy,
    SortByDesc,
    filter,
    presentContact = null,
    limit = 5,
    offset = 0,
  } = query;
  const optionsSearch = { owner: userId };

  if (presentContact !== null) {
    optionsSearch.present = presentContact;
  }
  const results = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(SortBy ? { [`${SortBy}`]: 1 } : {}),
      ...(SortByDesc ? { [`${SortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
  });
  return results;
};
// const listContacts = async () => {
//   const results = await Contact.find({});
//   return results;
// };
const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email gender",
  });
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
