const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      unique: true,
    },
    subscription: {
      type: String,
      default: "free",
    },
    password: {
      type: String,
      default: "password",
    },
    token: {
      type: String,
      default: "",
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    present: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.virtual("info").get(function () {
  console.log(`this ${this.name}`);
});
contactSchema.path("name").validate((value) => {
  const re = /[A-Z]\w+/g;
  return re.test(String(value));
});

contactSchema.plugin(mongoosePaginate);
const Contact = model("contact", contactSchema);
module.exports = Contact;
