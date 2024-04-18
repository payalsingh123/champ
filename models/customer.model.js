const { seqlize } = require("../configs/db");
const { DataTypes } = require("sequelize");
const { orderModel } = require("./order.model");
const { addToCartModel } = require("./addToCart.model");
const { productModel } = require("./product.model");

let customerModel = seqlize.define("customer", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(52)
    },
    email: {
        type: DataTypes.STRING(52),
        unique: true
    },
    password:{
        type:DataTypes.STRING(52)

    }
})

customerModel.hasMany(orderModel, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE'
})
customerModel.hasMany(addToCartModel, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE'
})

orderModel.belongsTo(customerModel, {
    foreignKey: 'customerId'
})
addToCartModel.belongsTo(customerModel, {
    foreignKey: 'customerId'
})

productModel.hasMany(orderModel, {
    foreignKey: 'productId',
    onDelete: 'CASCADE'
})

orderModel.belongsTo(productModel, {
    foreignKey: 'productId'
})

productModel.hasMany(addToCartModel, {
    foreignKey: 'productId',
    onDelete: 'CASCADE'
})

addToCartModel.belongsTo(productModel, {
    foreignKey: 'productId'
})

async function syncData() {
    try {
        await seqlize.sync()
        // console.log(" customer table created sucessfully");
    } catch (error) {
        console.log("error while creating customer table");
    }
}
syncData()
module.exports = { customerModel }