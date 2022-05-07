const adminHandler = async (req, res, next) => {
  try {
    const { role } = req.params.tokenPayload;
    console.log(role);
    if (role != "admin") {
      throw new Error("No tiene permisos");
    }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { adminHandler };
