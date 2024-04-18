const { DataTypes } = require("sequelize")
const { seqlize } = require("../configs/db")
const { categoryModel } = require("./category.model")
const { productModel } = require("./product.model")
const adminModel = seqlize.define("admins", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullname:{
        type: DataTypes.STRING(32),
        allowNull:false
    },
    userName: {
        type: DataTypes.STRING(32),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(152),
        allowNull: false
    },
    profile: {
        type: DataTypes.STRING(152),
        allowNull: false
    }
})

adminModel.hasMany(categoryModel, {
    foreignKey: "adminId",
    onDelete: "CASCADE"
})
adminModel.hasMany(productModel, {
    foreignKey: 'adminId',
    onDelete: "CASCADE"
})
productModel.belongsTo(adminModel, {
    foreignKey: 'adminId'
})
categoryModel.belongsTo(adminModel, {
    foreignKey: 'adminId'
})

async function syncDatabase() {
    try {
        await seqlize.sync()
        // console.log("table created admins sucessfully");
    } catch (error) {
        console.log("error while creating admins table");
    }
}

syncDatabase()

module.exports = { adminModel }