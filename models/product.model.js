const {DataTypes}= require("sequelize")
const { seqlize } = require("../configs/db")
const productModel=seqlize.define("products",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(32),
        allowNull:false
    },
    rating:{
        type:DataTypes.FLOAT(2,1) ,
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    desc:{
        type:DataTypes.STRING(600) ,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING(152),
        allowNull:false
    }

})


async function syncDatabase(){
    try {
        await seqlize.sync()
        // console.log("table created product sucessfully");
    } catch (error) {
        console.log("error while creating product table");
    }
}

syncDatabase()

module.exports= {productModel}