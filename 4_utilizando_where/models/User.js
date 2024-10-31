import { DataTypes } from "sequelize"; //especificar tipos

import db from "../db/conn.js"; //importando variavel de conexão pra operações

const User = db.define("User", {//o id é difinido sozinho por padrão
  name: {
    type: DataTypes.STRING,
    allowNull: false,//não permiti null mas vazio permiti ex:""''
  },
  occupation:{
    type: DataTypes.STRING,
    required: true,//não aceita nada vazio nem null e nem ""''
  },
  newsLetter:{
    type: DataTypes.BOOLEAN,
  }
});

export default User;