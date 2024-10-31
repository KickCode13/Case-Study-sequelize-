import express, { raw } from "express";
import { engine } from "express-handlebars";

import msqlConnection from "./db/conn.js";
const app = express();
import User from "./models/User.js";

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//pasta estica
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render("home");
});

app.get('/cadastrar', (req, res)=>{
  res.render('addUser');
});

app.post('/cadastrar', async (req, res)=>{
  const {name, occupation} = req.body;
  let newsLetter = req.body;
  if(newsLetter === 'on'){
    newsLetter = true;
  }
  else{
    newsLetter = false;
  }
  try{
    if(await User.create({name, occupation, newsLetter})){
      res.status(201).json({message: "Usuario criado"})
    }

  }
  catch(err){
    res.status(500).json({message:"Erro na criação"});
  }
  

});
app.get('/users', async (req, res)=>{
  try{
    const users = await User.findAll({ raw: true});
    res.render("users",{users});
  }
  catch(err){
    res.status(500)
  }
 
})
msqlConnection
  .sync()
  .then(() => console.log("Banco sincronizado com sucesso"))
  .catch((err) => {
    console.log("Houve um erro na sincronização:", err);
  });

app.listen(3000);
