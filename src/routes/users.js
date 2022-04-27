const express = require("express");
const userModel = require("../models/user");
const user = require("../usecases/user");

const router = express.Router();

router.get("/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const retrievedUser = await user.getByEmail(email);
    res.json({
      firstName: retrievedUser.firstName,
      lastName: retrievedUser.lastName,
      imageUser: retrievedUser.imageUser,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userCreated = await user.create(firstName, lastName, email, password);
    res.json({
      success: true,
      message: "User created",
      payload: userCreated,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const userInfo = await user.getByEmail(email);
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
