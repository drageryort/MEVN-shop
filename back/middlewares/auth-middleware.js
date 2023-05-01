const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  try{
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccesToken(accessToken)
    if(!userData){
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}