let urlTrack=(req,res,next)=>{

    // app.get('*', (req, res) => {
        console.log(`A user visited: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    //     res.send('Hello, World!');
    // });
    next()

}
module.exports={urlTrack}