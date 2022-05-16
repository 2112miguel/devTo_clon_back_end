const router = require("express").Router();
const post = require("../usecases/post");
const user = require("../usecases/user");
const { delPost } = require("../middlewares/permisionHandler");
const { authHandler } = require("../middlewares/authHandler");

router.get("/", async (req, res, next) => {
  try {
    const getPost = await post.get();
    const objPost = [];
    getPost.forEach((item, index) => {
      objPost[index] = {
        id: item._id,
        commentsPost: item.commentsPost,
        content: item.content,
        datePost: item.datePost,
        image: item.image,
        titlePost: item.titlePost,
        tags: item.tags,
        reactionsPost: item.reactionsPost,
        timeReadP: item.timeReadP,
        userId: item.userId[0].email,
        imageUser: item.userId[0].imageUser,
      };
    });
    res.json({
      payload: objPost,
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
      id: getIdPost._id,
      commentsPost: getIdPost.commentsPost,
      content: getIdPost.content,
      datePost: getIdPost.datePost,
      image: getIdPost.image,
      titlePost: getIdPost.titlePost,
      tags: getIdPost.tags,
      reactionsPost: getIdPost.reactionsPost,
      timeReadP: getIdPost.timeReadP,
      userId: getIdPost.userId[0].email,
      imageUser: getIdPost.userId[0].imageUser,
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
      idUserPost,
      titlePost,
      tags,
      reactionsPost,
      timeReadP,
    } = req.body;
    const userId = await user.getById(idUserPost);
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

router.patch("/:id", authHandler, delPost, async (req, res, next) => {
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

router.delete("/:id", authHandler, delPost, async (req, res, next) => {
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
