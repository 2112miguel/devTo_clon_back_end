const delPost = async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    if (req.body.idUser != _id) {
      console.log("entra per", req.params);
      throw new Error("No tienes permisos");
    }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    console.log(_id);
    console.log(req.params);
    if (req.params.id != _id) {
      console.log("entra");
      throw new Error("No tienes permisos");
    }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { delPost, getUser };
