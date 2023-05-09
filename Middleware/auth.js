const User=require('../Database/Schema');


const Auth= async(req,res,next)=>{

    try {
         let make=req.cookies.jwt;
         console.log(make);
         next();
        
    } catch (error) {
        res.status(400).json({con:400});
    }
}


module.exports=Auth;