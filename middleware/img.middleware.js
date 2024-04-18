const multer= require("multer")
const path= require("path")
const imgUpload= multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            const store= path.join(__dirname,'../images/genral')
            cb(null,store)
            console.log("came inside multer");
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname + "-" + Date.now() + ".jpg");
        }
    })
}).single('image')


module.exports= {imgUpload}