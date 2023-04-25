const UserModel = require("../modeles/user_model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mail-service");
const TokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

const UserService = {

  async registration(email, password) {
    //Check is email free
    const candidate = await UserModel.findOne({email});
    if(candidate) {
      throw ApiError.BadRequestError(`Пользователь с email - ${email} уже существует`);
    }

    //Prepare user data
    const hashPassword = await bcrypt.hash(password,3);
    const activationLink = uuid.v4();

    //Create user
    const user = await UserModel.create({
      email,
      password:hashPassword
    })

    //Send letter for activation
    await MailService.sendActivationMail(email, `${process.env.URL}/api/activate/${activationLink}`);

    //Prepare token data
    const userDto = new UserDto(user); //user,id, isActivated
    const tokens = TokenService.generateToken({...userDto});

    //Create token
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }

  },

  async activate (activationLink) {
    const user = await UserModel.findOne({activationLink})
    if (!user) {
      throw ApiError.BadRequestError('Ссылка активации не рабочая')
    } else {
      user.isActivated = true;
      await user.save()
    }
  },

  async login(email,password) {
    const user = await UserModel.findOne({email});
    if (!user){
      throw ApiError.BadRequestError(`Пользователь с email - ${email} не найден`);
    }
    const isPassEquals = await bcrypt.compare(password,user.password);
    if(!isPassEquals) {
      throw ApiError.BadRequestError(`Пароль не корректен`);
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({...userDto})

    //Create token
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  },

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  },

  async refresh(refreshToken){
    if(!refreshToken){
      throw ApiError.UnauthorizedError()
    }
    const token = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = TokenService.findToken(refreshToken);

    if(!token || !tokenFromDB) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findById(token.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({...userDto})

    //Create token
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    }

  },

  async getAllUsers(){
    const allUsers = await UserModel.find();
    return allUsers;
  }
}

module.exports = UserService;