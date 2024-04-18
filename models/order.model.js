const { seqlize } = require("../configs/db");
const {DataTypes}= require("sequelize")

let orderModel= seqlize.define("order",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
})

async function syncData() {
    try {
        await seqlize.sync()
        // console.log(" order table created sucessfully");
    } catch (error) {
        console.log("error while creating order table");
    }
}
syncData()


module.exports={orderModel}