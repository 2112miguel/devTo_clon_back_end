const router = require("express").Router();
const post = require("../usescases/post");

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
    res.json({
      success: true,
      playload: getIdPost,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      commentsPost,
      content,
      datePost,
      image,
      imageUser,
      userId,
      titlePost,
      tags,
      reactionsPost,
      timeReadP,
    } = req.body;
    const createPost = await post.createPost({
      commentsPost,
      content,
      datePost,
      image,
      imageUser,
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
  }
});

router.patch("/:id", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
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