const userRouter = require("./users");

const apiRouter = (app) => {
  app.use("/users", userRouter);
};

module.exports = apiRouter;
