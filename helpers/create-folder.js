const fs = require("fs/promises");

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .then(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = createFolderIsNotExist;
