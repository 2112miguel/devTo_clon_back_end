const router = require("express").Router();
const { authHandler } = require("../middlewares/authHandler");
const post = require("../usecases/post");
const user = require("../usecases/user");

router.get("/", async (req, res, next) => {
  try {
    console.log("Entra");
    const getPost = await post.get();
    res.json({
      playload: getPost,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getIdPost = await post.getById(id);
    console.log(getIdPost.userId);
    res.json({
      success: true,
      playload: getIdPost,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", authHandler, async (req, res, next) => {
  try {
    const {
      commentsPost,
      content,
      datePost,
      image,
      userEmail,
      titlePost,
      tags,
      reactionsPost,
      timeReadP,
    } = req.body;
    const userId = await user.getByEmail(userEmail);
    const createPost = await post.createPost({
      commentsPost,
      content,
      datePost,
      image,
      userId,
      titlePost,
      tags,
      reactionsPost,
      timeReadP,
    });
    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.patch("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const postUpdate = await post.patch(id, { ...req.body });
    res.json({
      success: true,
      playload: postUpdate,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const delPost = await post.del(id);
    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
