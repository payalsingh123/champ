const {DataTypes}= require("sequelize")
const { seqlize } = require("../configs/db")
const { productModel } = require("./product.model")
const categoryModel= seqlize.define("categories",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(32),
        allowNull:false
    }
})

categoryModel.hasMany(productModel,{
    foreignKey:'categoryId',
    onDelete:'CASCADE'
})
productModel.belongsTo(categoryModel,{
    foreignKey:'categoryId'
})


async function syncDatabase(){
    try {
        await seqlize.sync()
        // console.log("table created category sucessfully");
    } catch (error) {
        console.log("error while creating category table");
    }
}

syncDatabase()


module.exports= {categoryModel}