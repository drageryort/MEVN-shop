module.exports = class UserDto {
  name;
  phone;
  email;
  id;
  isActivated;

  constructor(model) {
    this.name = model.name;
    this.email = model.email;
    this.phone = model.phone;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}