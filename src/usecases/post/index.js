const Post = require("../../models/post").model;

const get = async () => {
  const posts = await Post.find({}).populate("userId").exec();
  console.log(posts.content);
  return posts;
};

const getById = async (id) => {
  return await Post.findById(id).populate("userId").exec();
};

const createPost = async (post) => {
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
  } = post;
  const newPost = new Post({
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
  return newPost.save();
};

const patch = async (id, postData) => {
  return await Post.findByIdAndUpdate(id, { ...postData }).exec();
};

const del = async (id, postData) => {
  return await Post.findByIdAndDelete(id).exec();
};

module.exports = {
  get,
  getById,
  createPost,
  patch,
  del,
};
