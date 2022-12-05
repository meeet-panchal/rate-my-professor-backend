module.exports = (req,res,next)=>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.set("Access-Control-Allow-Credentials",true)
    next()

}