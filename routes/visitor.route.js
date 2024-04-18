const express= require("express");
const { visitorModel } = require("../models/visitor.model");
const visitorRouter=express.Router()
const geoIp = require("geoip-lite")
const { State } = require("country-state-city")
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');



// let current;
// visitorRouter.post("/",async(req,res)=>{
//     try {
//         console.log("came to visitor routert");
//         const rName = uniqueNamesGenerator({ dictionaries: [colors, animals] });
//         vistorName = rName.split("_").join(" ");
//         // let ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//         let ans = geoIp.lookup("203.187.228.57")
//         console.log(ans);
//         let { city } = ans
//         let state1 = State.getStateByCodeAndCountry(ans.region, ans.country);
//         let state = state1.name
//         // console.log(vistorName);
//         let ans1=await visitorModel.create({ visitorName: vistorName, city, state })
//         current = ans1.visitorId
//         // res.send(current)
//     } catch (error) {
//         console.log(error);
//     }
// })
 
visitorRouter.get("/",async(req,res)=>{

    try {
        let ans= await visitorModel.findAll()
        res.send(ans)
    } catch (error) {
        console.log("error while fetching all visitors",error);
    }


})


module.exports={visitorRouter}