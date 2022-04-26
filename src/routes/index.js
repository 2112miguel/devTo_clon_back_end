const postRoute = require("./post");

const apiRouter = (app) => {
  app.use("/posts", postRoute);
};

module.exports = apiRouter;
