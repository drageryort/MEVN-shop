const express = require("express");
const router = express.Router();
const {body} = require("express-validator")
const authMiddleware = require("../middlewares/auth-middleware")

const {
  registration,
  login,
  logout,
  activate,
  refreshToken,
  getUsers
} = require("../controller/user_controller");

router.post("/registration",
  body("email").isEmail(),
  body("password").isLength({min: 3, max: 16}),
  registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/activate/:link_from_email", activate);
router.get("/refresh_token", refreshToken);
router.get("/users", authMiddleware, getUsers);

module.exports = router
