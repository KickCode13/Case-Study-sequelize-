import express from "express";
import { engine } from "express-handlebars";

import msqlConnection from "./db/conn.js";
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});


app.listen(3000);