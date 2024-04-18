const express = require("express")
const { eventModel } = require("../models/event.model")
const { seqlize } = require("../configs/db")
const eventRouter = express.Router()

eventRouter.post("/", async (req, res) => {
    try {
        await eventModel.bulkCreate(req.body)
        res.send("new event created");
    } catch (error) {
        console.log("error while creating event", error);
    }
})

eventRouter.get("/onlyOne", async (req, res) => {
    try {
      if(Object.keys(req.query).length){
        let eventId=req.query.eventId
        let visitorId=req.query.visitorId
        // let handleId = req.params.id;
        let ans = await eventModel.findAll({
            where: {
                visitorId: visitorId,
                id:eventId
          
            },
        })
        // console.log("---------------------------------------------------------------------");
        // console.log("----------------------------------------------------------------------");
        // console.log(ans);
        // console.log(ans[0].time);
        res.send(`${ans[0].time}` )
      }
        
    } catch (error) {
        console.log("error while fteching visitors data", error);
    }
})


eventRouter.get("/limit",async(req,res)=>{
    // console.log(req.query)
    try {
        let vis=  +req.query.id
        let offy= +req.query.offset;
        let limit= +req.query.limit;
        // console.log(vis,offy,limit);
        if(Object.keys(req.query).length){
            let ans= await eventModel.findAll({
                where:{
                    visitorId:vis
                },
                offset:offy,
                limit:limit
            })
            res.send(ans)
            // console.log("--------------------------------------------------------------------")
            // console.log("--------------------------------------------------------------------")
            // console.log("--------------------------------------------------------------------")
            // console.log("--------------------------------------------------------------------")
        }
    } catch (error) {
        console.log("lwde ka error",error);
    }
})



eventRouter.get("/:id", async (req, res) => {
    try {
        let handleId = req.params.id;
        let ans = await eventModel.findAll({
            where: {
                visitorId: handleId
            },
            limit:2000
        })
        res.send(ans)
    } catch (error) {
        console.log("error while fteching visitors data", error);
    }
})

 

eventRouter.get("/count/:id", async (req, res) => {
    try {
        let handleId = req.params.id;
        let eventsCount=await eventModel.count({
            where:{
                visitorId:handleId
            }
        })
        // let first=
        // let data={firstTime:}


        res.send(`${eventsCount}`)
    } catch (error) {
       res.status(404).send("error while counting events for particular visitorId")
    }
})






module.exports = { eventRouter }