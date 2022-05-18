const post = require("../usecases/post");

const delPost = async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    const getIdPost = await post.getById(req.params.id);

    if (getIdPost.userId[0]._id != _id) {
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
