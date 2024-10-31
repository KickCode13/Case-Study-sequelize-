import express from "express";
import { engine } from "express-handlebars";

import msqlConnection from "./db/conn.js";
const app = express();
import User from "./models/User.js";

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

msqlConnection
  .sync()
  .then(() => console.log("Banco sincronizado com sucesso"))
  .catch((err) => {
    console.log("Houve um erro na sincronização:", err);
  });

app.listen(3000);
