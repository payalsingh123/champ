const express = require("express")
const { authentication } = require("../middleware/auth.middleware");
const { categoryModel } = require("../models/category.model");
const categoryRouter = express.Router()
categoryRouter.use(express.json())


categoryRouter.get("/",async(req,res)=>{ 
    try {
        let ans= await categoryModel.findAll()
        res.send(ans)

    } catch (error) {
        console.log(error);
    }
})

categoryRouter.post("/", authentication, async (req, res) => {
    // console.log(req);
    const { name, adminId } = req.body;
    try {
        await categoryModel.create({ name, adminId })
        res.send("new category created");
    } catch (error) {
        console.log("error while creating category");
        console.log(error);
    }

})

categoryRouter.patch("/:id", authentication, async (req, res) => {
    let ID = req.params.id
    // console.log(req.body);
    let payload = req.body
    try {
        let category = await categoryModel.findOne({ where: { id: ID } })
        let catId = category.adminId;
        let reqId = req.body.adminId;
        if (catId == reqId) {
            await categoryModel.update(payload, {
                where: {
                    id: ID
                }
            })
            res.send("category is updated")
        } else {
            console.log("please login first");
        }
    } catch (error) {
        console.log(error);
    }
})


categoryRouter.delete("/:id",authentication ,async (req, res) => {
    let ID = req.params.id;
    try {
        let category = await categoryModel.findOne({ where: { id: ID } })
        let catId = category.adminId
        let reqId = req.body.adminId
        // console.log(category);
        // console.log(req.body);
        if (catId == reqId) {
            await categoryModel.destroy({ where: { id: ID } })
            res.send("category successfully deleted")
        } else {
            res.send("you are not authorized")
        }

    } catch (error) {
        console.log(error);
    }

})


module.exports = { categoryRouter }