let rateAd=(req,res,next)=>{
 
     try {
 
        let data= ((Math.random() * (5 - 1) + 1).toFixed(1)).toString();
      //   console.log(data);
        req.body.rating =`${data}`
        next()       
     } catch (error) {
        console.log(error);
     }
}

module.exports={rateAd}