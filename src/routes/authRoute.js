const route = require("express").Router();
const { signUp, login, getUser } = require("../controllers/authController");

route.post("/signup", signUp);
route.post("/login", login);
route.get("/user/:id", getUser);

module.exports = route;
