const express = require("express")
const { customerModel } = require("../models/customer.model")

const customerRouter = express.Router()

customerRouter.post("/", async (req, res) => {
    // const 

    try {
        await customerModel.create(req.body)
        console.log("new customer created");
        res.send("new customer created")
    } catch (error) {
        console.log("error while creating customer");
    }
})

customerRouter.post("/login", async (req, res) => {
    // const 

    try {
        let { email, password } = req.body
        if (email) {
            let ans = await customerModel.findOne({ where: { email: email } })
            if (ans) {
                if (ans.password == password) {
                    res.send(ans)
                }else{
                    res.status(400).send("incorrect password")
                }
            }else{
                res.status(400).send("invalid email")
            }
        }

        
        // await customerModel.create(req.body)
        // console.log("new customer created");
        // res.send("new customer created")       
    } catch (error) {
        console.log("error while creating customer");
    }
})

customerRouter.get("/", (req, res) => {
    res.send("customers this side")
})

module.exports = { customerRouter }