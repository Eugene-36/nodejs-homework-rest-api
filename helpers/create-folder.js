// const fs = require("fs/promises");

// const isAccessible = (path) => {
//   return fs
//     .access(path)
//     .then(() => true)
//     .then(() => false);
// };

// // const createFolderIsNotExist = async (folder) => {
// //   if (!(await isAccessible(folder))) {
// //     await fs.mkdir(folder);
// //   }
// // };
// let path = require("path");
// let fs = require("fs").promises;
// (async () => {
//   let data = await fs.readFile(path.resolve("package.json"), "utf8");
//   console.log(JSON.parse(data).version);
// })();

const fs = require("fs/promises");

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = createFolderIsNotExist;
