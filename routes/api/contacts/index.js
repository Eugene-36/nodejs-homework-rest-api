const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationMongoId,
} = require("./validation");
// console.log(Contacts);
router
  .get("/", guard, ctrl.getAll)
  .post("/", guard, validationCreateContact, ctrl.create);

router
  .get("/:contactId", guard, validationMongoId, ctrl.getById)
  .delete("/:contactId", guard, validationMongoId, ctrl.remove)
  .put(
    "/:contactId",
    guard,
    validationMongoId,
    validationUpdateContact,
    ctrl.update
  );

router.patch(
  "/:contactId/inArray",
  guard,
  validationUpdateStatusContact,
  ctrl.update
);

module.exports = router;
