const Post = require("../../models/post").model;

const get = async () => {
  return await Post.find({}).exec();
};

const getById = async (id) => {
  return await Post.findById(id).exec();
};

const createPost = async (post) => {
  const { imagen, userId, titlePost, tags, content } = post;
  const newPost = new Post({
    imagen,
    userId,
    titlePost,
    tags,
    content,
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
