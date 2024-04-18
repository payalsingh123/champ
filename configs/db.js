const {Sequelize}= require("sequelize")
require("dotenv").config()
 
const seqlize=new Sequelize("champion","root",`${process.env.dbPassword}`,{
    host:"localhost",
    dialect:"mysql"
})

 
module.exports = {seqlize}