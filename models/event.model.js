const {DataTypes}= require("sequelize")
const { seqlize } = require("../configs/db")
const eventModel = seqlize.define("events",{
   
    eventType:{
        type:DataTypes.STRING(32),
        allowNull:false
    },
    x:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    y:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    scrollPosition:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    url:{
        type:DataTypes.STRING(152),
        allowNull:true
    },
    time:{
        type:DataTypes.BIGINT,
        allowNull:true
    }
})

syncD= async()=>{

    try {
        seqlize.sync();
        // console.log("events table created");
    } catch (error) {
     console.log("error while creating events table");   
    }

}

syncD()
module.exports={eventModel}