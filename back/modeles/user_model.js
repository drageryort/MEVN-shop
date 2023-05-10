const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  phone: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  activationLink: {
    type: String
  },
})

module.exports = model("UserSchema", UserSchema)