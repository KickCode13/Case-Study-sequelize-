import express, { raw } from "express";
import { engine } from "express-handlebars";

import msqlConnection from "./db/conn.js";
const app = express();
import User from "./models/User.js";
import Adress from "./models/Adress.js";
import { where } from "sequelize";

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//pasta estica
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cadastrar", (req, res) => {
  res.render("addUser");
});

app.post("/cadastrar", async (req, res) => {
  const { name, occupation, newsLetter } = req.body;

  try {
    if (await User.create({ name, occupation, newsLetter })) {
      res.status(201).json({ message: "Usuario criado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro na criação" });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ raw: true });
    res.render("users", { users });
  } catch (err) {
    res.status(500);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ raw: true, where: { id } });
    if (user) {
      res.render("userView", { user });
    }
  } catch (err) {
    console.log("Ocorreu um erro na Operação", err);
    res.status(500);
  }
});

app.delete("/users/del/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.destroy({ where: { id } });
    res.status(200).json({ message: "Usuario deletado" }); //sem o .json o navegar não considera o res.ok
  } catch (err) {
    console.log("Erro na operação", err);
    res.status(500).json({ message: "Erro na operação" });
  }
});
app.get("/users/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ include: Adress, where: { id } });//include: Adress inclui os enderços relacionados ao user
    if (user) {
      res.status(200).render("userEdit", { user: user.get({ plain:true }) }); //usar user.get({ plain:true } faz poder
    }                                                                         //acessar os atrbitutos assim user.name
  } catch (err) {                                                             //sem seria : user.dataValues.name
    res.status(500).json({ message: "Erro na operação" });
  }
});
app.put("/users/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { name, occupation, newsLetter } = req.body;
    await User.update({ name, occupation, newsLetter }, { where: { id } });
    res.status(200).json({ message: "Objeto atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro na operação" });
  }
});

app.post("/adress/create", async (req, res) => {
  const { street, city, number, UserId } = req.body;
  const adress = { street, city, number, UserId };
  try {
    const createdAdress = await Adress.create(adress);
    if (createdAdress) {
      res.redirect("/");
    }
  } catch (err) {
    console.log("Houve um erro", err);
  }
});
app.delete('/adress/del', async(req, res) =>{
  const AdressId = req.body.AdressId;
  try {
    
    const deletedAdress = await Adress.destroy({
      where:{id:AdressId}
    })
    if(deletedAdress){
      res.status(200).json({message:"Endereço deletado com sucesso"});
    }
  } catch (err) {
    console.log(err);
  }
  
})
msqlConnection
  .sync()
  .then(() => console.log("Tabelas recriadas com sucesso(limpou tudo)"))
  .catch((err) => {
    console.log("Houve um erro na sincronização:", err);
  });

app.listen(3000);
