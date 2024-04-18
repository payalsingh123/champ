const express = require("express")
let path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { imgUpload } = require("../middleware/img.middleware")
const { adminModel } = require("../models/admin.model")
const adminRouter = express.Router()
adminRouter.use(express.json())


// adminRouter.get("/",(req,res)=>{
//     res.send("admin homepage")
// })

adminRouter.get("/:id", async (req, res) => {
    try {

        let ID = req.params.id;
        let ans = await adminModel.findOne({ where: { id: ID } })
        res.send(ans)
        // res.sendFile(path.join(__dirname,'../public/adminInterface.html'))
    } catch (error) {
        console.log(error);
    }

})

adminRouter.get("/", async (req, res) => {

    if (req.query.id) {
        try {
            let admin = await adminModel.findOne({ where: { id: req.query.id } })
            res.send(admin)
        } catch (error) {
            console.log("error while getting data");
        }
    } else {
        res.send("ntg")
    }

})


// admin signup
adminRouter.post("/", imgUpload, async (req, res) => {
    try {
        const { fullname, userName, password } = req.body
        let profile = `images/${req.file.filename}`
        bcrypt.hash(password, 5, async (err, hashed_pass) => {
            if (err) {
                console.log(err);
            } else {
                await adminModel.create({ fullname, userName, password: hashed_pass, profile })
                res.send("new admin created sucessfully")
                console.log("new admin created sucessfully");
            }
        })
    } catch (error) {
        console.log("unable to creatw admin");
        console.log(error);
    }
})

// admin login
adminRouter.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        let user = await adminModel.findAll({
            where: {
                userName: userName
            }
        })
        if (user.length) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userId: user[0].id }, "masai")
                    res.send({ "msg": "login sucessfull", "token": token, "id": user[0].id,"admin":user[0].userName })
                } else {
                    console.log("incorrect password");
                }
            })
        } else {
            res.send("user not defined")
        }
    } catch (error) {
        console.log(error);
    }
})

adminRouter.patch("/:id", async (req, res) => {
    try {
        let payload = req.body
        let id = req.params.id
        await adminModel.update(payload, {
            where: {
                id: id
            }
        })
        res.send("admin updated")
    } catch (error) {
        console.log("error while updating admin");
    }

})

module.exports = { adminRouter }