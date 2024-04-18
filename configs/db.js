const {Sequelize}= require("sequelize")
require("dotenv").config()
 
const seqlize=new Sequelize("champion","root",`Hi@payal12`,{
    host:"localhost",
    dialect:"mysql"
})

 
module.exports = {seqlize}
