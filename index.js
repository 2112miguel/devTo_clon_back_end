const express = require("express");
const app = express();
const port = 5000;
const db = require("./src/lib/db");
const config = require("./src/lib/config");
const apiRouter = require("./src/routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
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
