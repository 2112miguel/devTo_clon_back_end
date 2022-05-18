const express = require("express");
const userModel = require("../models/user");
const user = require("../usecases/user");
const router = express.Router();
const { delPost, getUser } = require("../middlewares/permisionHandler");
const { authHandler } = require("../middlewares/authHandler");
const { adminHandler } = require("../middlewares/adminHandler");
const jwt = require("../lib/jwt");

router.get("/:id", authHandler, getUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const retrievedUser = await user.getById(id);
    if (retrievedUser) {
      res.json({
        firstName: retrievedUser.firstName,
        lastName: retrievedUser.lastName,
        imageUser: retrievedUser.imageUser,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {}
});

router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userCreated = await user.create(firstName, lastName, email, password);
    const userId = await user.getByEmail(email);
    const token = await jwt.sign({
      _id: userId._id,
      role: userId.role,
    });
    res.json({
      success: true,
      message: "User created",
      payload: token,
      id: userId._id,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", authHandler, getUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userInfo = await user.getById(id);
    user.patch(userInfo._id, { ...req.body });
    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = router;
