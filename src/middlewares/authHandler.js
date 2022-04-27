const jwt = require("../../src/lib/jwt");

const authHandler = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const verifiedToken = await jwt.verify(token);
    req.params.tokenPayload = verifiedToken;

    next();
  } catch (error) {
    console.log(req.headers);
    res.status(401).json({
      succes: false,
      message: "Token Invalido",
    });
  }
};

module.exports = { authHandler };
