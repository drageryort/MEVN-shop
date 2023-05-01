const jwt = require("jsonwebtoken");
const TokenModel = require("../modeles/token_model");

const TokenService = {
  validateAccesToken (token) {
    try{
      const tokenValidity = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
      return tokenValidity;
    } catch (e) {
      return null;
    }
  },
  validateRefreshToken (token) {
    try{
      const tokenValidity = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
      return tokenValidity;
    } catch (e) {
      return null;
    }
  },

  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
      //Token life period
      expiresIn: '10m'
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
      //Token life period
      expiresIn: '30d'
    })
    return {
      accessToken,
      refreshToken
    }
  },
  async saveToken(userId, refreshToken){
    const token = await TokenModel.findOne({user: userId});
    if(token){
      token.refreshToken = refreshToken;
      return token.save();
    }
    const newToken = await TokenModel.create({user: userId, refreshToken});
    return newToken;
  },
  async removeToken(refreshToken){
    const token = await TokenModel.deleteOne({refreshToken});
    return token;
  },
  async findToken(refreshToken){
    const token = await TokenModel.findOne({refreshToken});
    return token;
  }
}

module.exports = TokenService