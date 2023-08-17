const User=require('../Database/Schema');
const jwt=require('jsonwebtoken');
const {Auto}=require('../Config/secret');


const Auth= async(req,res,next)=>{

    try {
         console.log('Auth Enter')
         let token=req.cookies.jwt;
         let verify=jwt.verify(token,Auto);

         let maindata= await User.find({_id:verify._id});        
         
         if(!maindata){
            throw new Error('User not found');
         }

         req.maindata=maindata;
         req.token=token;
         req.userID=maindata[0]._id;
       
         next();

        
        
    } catch (error) {
        res.status(400).json({con:400});
        return;
    }
}


module.exports=Auth;