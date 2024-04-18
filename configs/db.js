const {Sequelize}= require("sequelize")
require("dotenv").config()
 
const seqlize=new Sequelize("champion","root",`Hi@payal12`,{
    host:"localhost",
    dialect:"mysql"
})
console.log("seqllll",seqlize)
 
module.exports = {seqlize}
