const express = require("express");
const { seqlize } = require("./configs/db");
const geoIp = require("geoip-lite")
const { State } = require("country-state-city")
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const cors = require("cors");
const path = require("path")
const { adminRouter } = require("./routes/admin.routes");
const { categoryRouter } = require("./routes/category.routes");
const { productRouter } = require("./routes/product.routes");
const { customerRouter } = require("./routes/customer.route");
const { addToCartRouter } = require("./routes/addToCart.route");
const { orderRouter } = require("./routes/order.route");
const { visitorModel } = require("./models/visitor.model");
const { visitorRouter } = require("./routes/visitor.route");
const { addVisitor, currAns } = require("./middleware/vistor.middleware");
const { eventRouter } = require("./routes/event.route");

// const { urlTrack } = require("./middleware/track.middleware");
const app = express();
app.use(cors())
require("dotenv").config()
app.use(express.json())
// app.use(express.static('styles'))
app.use("/styles", express.static('styles'))
app.use("/scripts", express.static('scripts'))
app.use('/public', express.static('public'))
app.use("/images", express.static('images/genral'))
app.use("/admin", adminRouter)
app.use("/category", categoryRouter)
app.use("/product", productRouter)
app.use("/customer", customerRouter)
app.use("/addToCart", addToCartRouter)
app.use("/order", orderRouter)
app.use("/event",eventRouter)
app.use("/visitor",visitorRouter)
 


 

app.get("/",addVisitor ,async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public/index.html'))
    } catch (error) {
        console.log(error);
    }
})

app.get("/current",currAns,(req,res)=>{
    try {
        let result=req.body.ans
        res.send(`${result}`)
    } catch (error) {
      console.log(error);
    }
})

 







app.listen(process.env.port, async () => {
    console.log(`server is running on ${process.env.port}`);
    try {
        await seqlize.authenticate()
        console.log(`connected to DB`);
    } catch (error) {
        console.log("error connecting DB");
        console.log(error);
    }
})