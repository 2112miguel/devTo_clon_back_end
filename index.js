const express = require("express");
const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`Welcome to DevTo app, now listening on port: ${port}`);
});
