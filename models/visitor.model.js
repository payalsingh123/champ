const {DataTypes}= require("sequelize")
const { seqlize } = require("../configs/db")
const { eventModel } = require("./event.model")
const visitorModel=seqlize.define("visitors",{
    visitorId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true
    },
    visitorName:{
      type:DataTypes.STRING(152),
      allowNull:false
    },
    city:{
        type:DataTypes.STRING(152),
        allowNull:true
    },
    state:{
        type:DataTypes.STRING(32),
        allowNull:true
    },
    currentTime:{
        type:DataTypes.STRING(52),
        allowNull:true
    }
    
})

visitorModel.hasMany(eventModel,{
    foreignKey:'visitorId',
    onDelete:'CASCADE'
})
eventModel.belongsTo(visitorModel,{
    foreignKey:'visitorId'
})
async function syncDatabase(){
    try {
        seqlize.sync()
        console.log("visitors table is created");
    } catch (error) {
        console.log("error while creating visitors table");
    }
}
syncDatabase()
module.exports={visitorModel}