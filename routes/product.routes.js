const express = require("express")
const { productModel } = require("../models/product.model")
const { authentication } = require("../middleware/auth.middleware")
const { imgUpload } = require("../middleware/img.middleware")
const { rateAd } = require("../middleware/rate.middleware")
const { adminModel } = require("../models/admin.model")
const { Op } = require("sequelize")

const productRouter = express.Router()
productRouter.use(express.json())



// get all products
productRouter.get("/all", async (req, res) => {
    try {
        let ans = await productModel.findAll()
        res.send(ans)
    } catch (error) {
        console.log(error);
    }
})

// getting single product
productRouter.get("/:id", async (req, res) => {
    try {
        let ID = req.params.id
        // console.log(ID)
        let product = await productModel.findOne({
            where: {
                id: ID
            }
        })
        res.send(product)
        // console.log("pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")
        // console.log(product)
    } catch (error) {
        console.log(error);
    }

})

// getting the product by admin
productRouter.get("/", authentication, async (req, res) => {
    if (Object.keys(req.query).length) {
        let reqQueryAdmin = req.query.admin
        let admin = await adminModel.findOne({ where: { userName: reqQueryAdmin } })
        let reqbodyAdmin = req.body.adminId
        if (admin.id == reqbodyAdmin) {
            let adminProducts = await productModel.findAll({ where: { adminId: admin.id } })
            res.send(adminProducts)
        } else {
            res.status(400).send("You Are Not Authorized to Access data")
        }
    } else {
        res.send("error")
    }
})

// get products by category
productRouter.get("/category/:id", async (req, res) => {
    try {
        let ID = req.params.id
        let catProduct = await productModel.findAll({ where: { categoryId: ID } })
        res.send(catProduct)
    } catch (error) {
        console.log(error);
    }
})

// category products price asc order
productRouter.get("/category/:id/price/asc", async (req, res) => {
    try {
        let ID = req.params.id
        let catProduct = await productModel.findAll({
            where: { categoryId: ID },
            order: [['price', 'ASC']]
        })
        res.send(catProduct)
    } catch (error) {
        console.log(error);
    }
})
// category products price DESC order
productRouter.get("/category/:id/price/desc", async (req, res) => {
    try {
        let ID = req.params.id
        let catProduct = await productModel.findAll({
            where: { categoryId: ID },
            order: [['price', 'DESC']]
        })
        res.send(catProduct)
    } catch (error) {
        console.log(error);
    }
})


// category products rating asc order
productRouter.get("/category/:id/rate/asc", async (req, res) => {
    try {
        let ID = req.params.id
        let catProduct = await productModel.findAll({
            where: { categoryId: ID },
            order: [['rating', 'ASC']]
        })
        res.send(catProduct)
    } catch (error) {
        console.log(error);
    }
})
// category products rating DESC order
productRouter.get("/category/:id/rate/desc", async (req, res) => {
    try {
        let ID = req.params.id
        let catProduct = await productModel.findAll({
            where: { categoryId: ID },
            order: [['rating', 'DESC']]
        })
        res.send(catProduct)
    } catch (error) {
        console.log(error);
    }
})

// category products product name A TO Z order
productRouter.get("/category/:id/sort/asc", async (req, res) => {
    try {
        let ID = req.params.id
        let catProduct = await productModel.findAll({
            where: { categoryId: ID },
            order: [['name', 'ASC']]
        })
        res.send(catProduct)
    } catch (error) {
        console.log(error);
    }
})
// category products product name DESC order
productRouter.get("/category/:id/sort/desc", async (req, res) => {
    try {
        let ID = req.params.id
        let catProduct = await productModel.findAll({
            where: { categoryId: ID },
            order: [['name', 'DESC']]
        })
        res.send(catProduct)
    } catch (error) {
        console.log(error);
    }
})












//adding the product
productRouter.post("/", imgUpload, authentication, rateAd, async (req, res) => {
    // console.log(req.body);
    try {
        const image1 = `http://localhost:5050/images/${req.file.filename}`
        req.body.image = image1
        console.log(req.body);
        await productModel.create(req.body)
        //    res.send(ans);
        res.send("new product added")
    } catch (error) {
        console.log(error);
    }
})

// updating the product data
productRouter.patch("/:id", authentication, async (req, res) => {
    try {
        let payload = req.body
        console.log("payload", payload);
        let ID = req.params.id
        // console.log(ID);
        let reqBody = req.body.adminId
        console.log("reqBody", reqBody);
        let product = await productModel.findOne({ where: { id: ID } })
        let productAdmin = product.adminId
        console.log("productAdmin", productAdmin);
        if (reqBody == productAdmin) {
            try {
                await productModel.update(payload, {
                    where: {
                        id: ID
                    }
                })
                res.send("data succefully updated")
            } catch (error) {
                console.log("errror");
            }
        } else {
            res.sendStatus(400)
            // res.send("you are not authorized to update")
        }
    } catch (error) {
        console.log(error);
        res.send("you are not authorized to update")
    }
})

//deleting the product data
productRouter.delete("/:id", authentication, async (req, res) => {
    try {
        let ID = req.params.id
        let reqBody = req.body.adminId
        let product = await productModel.findOne({ where: { id: ID } })
        let productAdmin = product.adminId
        if (reqBody == productAdmin) {
            await productModel.destroy({ where: { id: ID } })
            res.send("data succefully deleted")
        } else {
            res.sendStatus(400)
            // res.send("you are not authorized to delete")
        }
    } catch (error) {
        console.log(error);
        res.send("not able to delete")
    }

})



// sorting product functionality
// low to high price
productRouter.get("/sort/lowToHighPrice", async (req, res) => {
    //    res.send("anss")
    try {
        let ans = await productModel.findAll({
            order: [['price', 'ASC']]
        })
        res.send(ans)
    } catch (error) {
        console.log(error);
    }
})

// high to low price
productRouter.get("/sort/highToLowPrice", async (req, res) => {
    //    res.send("anss")
    try {
        let ans = await productModel.findAll({
            order: [['price', 'DESC']]
        })
        res.send(ans)
    } catch (error) {
        console.log(error);
    }
})

// Rating low to high
productRouter.get("/sort/lowToHighRating", async (req, res) => {
    try {
        let ans = await productModel.findAll({
            order: [['rating', 'ASC']]
        })
        res.send(ans)
    } catch (error) {
        console.log(error);
    }
})
// Rating high to low
productRouter.get("/sort/highToLowRating", async (req, res) => {
    try {
        let ans = await productModel.findAll({
            order: [['rating', 'DESC']]
        })
        res.send(ans)
    } catch (error) {
        console.log(error);
    }
})

// product name A to z
productRouter.get("/sort/AtoZ", async (req, res) => {
    try {
        let ans = await productModel.findAll({
            order: [['name', 'ASC']]
        })
        res.send(ans)
    } catch (error) {
        console.log(error);
    }
})

productRouter.get("/sort/ZtoA", async (req, res) => {
    try {
        let ans = await productModel.findAll({
            order: [['name', 'DESC']]
        })
        res.send(ans)
    } catch (error) {
        console.log(error);
    }
})


// productRouter.get("/search/name",async(req,res)=>{
//     let q= req.query.a
//     // res.send(req.query)
//     try {
//         let ans= await productModel.findAll({
//             where:{
//                 name:{
//                     [Op.like]: '%' + q + '%'
//                 }
//             }
//         })
//         res.send(ans)
//     } catch (error) {
//         console.log(error);
//     }
// })

module.exports = { productRouter }