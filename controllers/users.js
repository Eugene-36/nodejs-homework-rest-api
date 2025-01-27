const Users = require("../repositories/users");
const { HttpCode } = require("../helpers/constants");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
// const path = require("path");
require("dotenv").config();
// const UploadAvatarService = require("../services/local-upload");
const UploadAvatarService = require("../services/cloud-upload");
const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email is already used",
      });
    }
    const { id, name, email, gender, avatar } = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { id, name, email, gender, avatar },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    const isValidPassword = await user?.isValidPassword(req.body.password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Invalid Credentials",
      });
    }
    const id = user.id;
    const payload = { id, test: "Thanos has come" };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1w" });
    await Users.updateToken(id, token);
    return res.json({ status: "success", code: 200, data: { token } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);

    return res.status(HttpCode.NON_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

// Local upload
// const avatars = async (req, res, next) => {
//   try {
//     const id = req.user.id;
//     const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS);
//     const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file });

//     try {
//       await fs.unlink(path.join(process.env.AVATAR_OF_USERS, req.user.avatar));
//     } catch (e) {
//       console.log(e.message);
//     }

//     await Users.updateAvatar(id, avatarUrl);
//     res.json({ status: "success", code: 200, data: { avatarUrl } });
//   } catch (error) {
//     next(error);
//   }
// };

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatarService();
    const { idCloudAvatar, avatarUrl } = await uploads.saveAvatar(
      req.file.path,
      req.user.idCloudAvatar
    );
    await fs.unlink(req.file.path);
    await Users.updateAvatar(id, avatarUrl, idCloudAvatar);
    res.json({ status: "success", code: 200, data: { avatarUrl } });
  } catch (error) {
    next(error);
  }
};
module.exports = { register, login, logout, avatars };
