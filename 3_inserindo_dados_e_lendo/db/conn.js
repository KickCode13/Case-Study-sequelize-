import Sequelize from 'sequelize'

const msqlConnection = new Sequelize("mysql_com_sequelize", "root", "", {
    host:'localhost',
    dialect:"mysql"
})

try{
   
    if(msqlConnection.authenticate()){
        console.log("Banco conectado com sucesso com sequelize")
    }
}
catch(err){
    console.log("Ocorreu o erro durante a conexão com o banco", err)
}
export default msqlConnection;