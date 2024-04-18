const { visitorModel } = require("../models/visitor.model");
// const { visitorRouter } = require("../routes/visitor.route");
const geoIp = require("geoip-lite")
const moment= require("moment-timezone")
const { State } = require("country-state-city")
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

let current;
let addVisitor = async (req, res, next) => {
    try {
        const rName = uniqueNamesGenerator({ dictionaries: [colors, animals] });
        vistorName = rName.split("_").join(" ");
        // let ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let ans = geoIp.lookup("203.187.228.57")
        // console.log(ans);
        let { city } = ans
        let state1 = State.getStateByCodeAndCountry(ans.region, ans.country);
        let state = state1.name
        // console.log(vistorName);
        // let currentTime=

        const ct = moment().tz('Asia/Kolkata');

        // Format the time as "13 Feb 2024 7:13 am"
        const currentTime = ct.format('D MMM YYYY h:mm a');
    


        let ans1 = await visitorModel.create({ visitorName: vistorName, city, state,currentTime })
         current = ans1.visitorId;
        next()
    } catch (error) {
        console.log(error);
    }
}

let currAns=(req,res,next)=>{
    try {
        // let ans=current;
        // console.log(current);
        req.body.ans=current
        // res.send(ans)
        next()
    } catch (error) {
        console.log(error);
    }
}


module.exports = { addVisitor ,currAns}