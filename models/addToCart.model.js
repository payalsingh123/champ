const { seqlize } = require("../configs/db");
const {DataTypes}= require("sequelize")

let addToCartModel= seqlize.define("addToCart",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
})

async function syncData() {
    try {
        await seqlize.sync()
        // console.log(" add to cart table created sucessfully");
    } catch (error) {
        console.log("error while creating add to cart table");
    }
}
syncData()


module.exports={addToCartModel}