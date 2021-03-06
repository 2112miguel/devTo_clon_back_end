const express = require("express");
const user = require("../usecases/user");
const jwt = require("../lib/jwt");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const retrievedUser = await user.getByEmail(email);
    if (retrievedUser) {
      const isMatch = await user.authenticate(retrievedUser, password);
      if (isMatch) {
        const token = await jwt.sign({
          _id: retrievedUser._id,
          role: retrievedUser.role,
        });
        res.json({
          success: true,
          payload: token,
          id: retrievedUser._id,
        });
      } else {
        res.status(401).json({ success: false });
      }
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
