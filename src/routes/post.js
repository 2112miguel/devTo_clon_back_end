const router = require("express").Router();
const { authHandler } = require("../middlewares/authHandler");
const post = require("../usecases/post");
const user = require("../usecases/user");

router.get("/", async (req, res, next) => {
  try {
    const getPost = await post.get();
    console.log(getPost[0]._id);
    getPost.forEach((post) => {
      console.log(post.userId[0].email);
      res.json({
        id: post._id,
        commentsPost: post.commentsPost,
        datePost: post.datePost,
        image: post.image,
        titlePost: post.titlePost,
        tags: post.tags,
        reactionsPost: post.reactionsPost,
        timeReadP: post.timeReadP,
        email: post.userId[0].email,
        imageUser: post.userId[0].imageUser,
      });
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
