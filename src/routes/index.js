const postRoute = require("./post");
const userRouter = require("./users");
const authRouter = require("./auth");

const apiRouter = (app) => {
  app.use("/posts", postRoute);
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
};

module.exports = apiRouter;
