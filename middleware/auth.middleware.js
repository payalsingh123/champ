const jwt= require("jsonwebtoken")

const authentication=(req,res,next)=>{
    try {
        let token= req.headers.authorization
        if(token){
          const decoded=  jwt.verify(token,"masai")
          let set=decoded.userId
          req.body.adminId= set
        }else{
            console.log("pleaseeeeeeeeeee login first");
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports= {authentication}