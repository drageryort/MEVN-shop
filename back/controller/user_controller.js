const UserService = require("../services/user-service");
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error")

const user_controller = {
  async registration (req, res, next){
    try{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(ApiError.BadRequestError("Ошибка валидации", errors.array()))
      }
      const {name, email, phone, password} = req.body;
      const userData = await UserService.registration(name, email, phone, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 *60 * 1000,
        httpOnly: true,
// for https
//        secure: true
      });
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 *60 * 1000,
        httpOnly: true,
      });
      return res.json(userData)

    } catch (e){
      next(e);
    }
  },
  async login (req, res, next){
    try{
      const {email, password} = req.body;
      const userData = await UserService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 *60 * 1000,
        httpOnly: true,
// for https
//      secure: true
      });
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 *60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e){
      next(e);
    }
  },
  async logout (req, res, next){
    try{
      const {refreshToken} = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      return res.json(token);
    } catch (e){
      next(e);
    }
  },
  async activate (req, res, next){
    try{
      const activationLink = req.params.link;
      await UserService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e){
      next(e);
    }
  },
  async refreshToken (req, res, next){
    try{
      const {refreshToken} = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 *60 * 1000,
        httpOnly: true,
// for https
//      secure: true
      });
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 *60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);

    } catch (e){
      next(e);
    }
  },
  async getUsers (req, res, next){
    try{
      const allUsers = await UserService.getAllUsers()
      return res.json(allUsers)
    } catch (e){
      next(e);
    }
  },
}

module.exports = user_controller

