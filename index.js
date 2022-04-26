const express = require("express");
const app = express();
const port = 8000;
const db = require("./src/lib/db");
const config = require("./src/lib/config");

const apiRouter = require("./src/routes");
app.use(express.json());
apiRouter(app);

app.listen(port, () => {
  console.log(`Welcome to DevTo app, now listening on port: ${port}`);

  db.connect()
    .then(() => {
      console.log("Conectado a la BD");
    })
    .catch((err) => {
      console.log("Conexion fallida");
    });
});
