const express = require("express");
const user = require("../usecases/user");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const retrievedUser = await user.getById(id);
    res.json({
      success: true,
      payload: retrievedUser,
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

module.exports = router;
