const route=require('express').Router();
const User=require('../Database/Schema');
const cookieparser=require('cookie-parser');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Auth=require('../Middleware/auth');



route.post('/register', async(req,res)=>{
     


    const {name,surname,age,number,email,gender,cpassword,password}=req.body;

    try {
        
        let userdata=await User.find({email:email});
         
        if(!name || !surname ||!age ||!number ||!email ||!gender ||!cpassword ||!password){
         res.status(500).json({con:500});
         return;
        }

         if(userdata.length!==0){
          res.status(300).json({con:300});
          return;
         }


     
        if(password===cpassword){

            userdata=new User({
            name,surname,age,number,email,gender,cpassword,password
          });
  
          let token=await userdata.getTokens();
  
          res.cookie('jwt',token,{
            httpOnly:true,
            secure:false,
          });

  
          let data=await userdata.save();
           
          res.status(200).json({con:200});
          return;
       }else{
        res.status(250).json({con:250});
        return;
       }
    } catch (error) {
        console.log(error);
    }


});


route.get('/about',Auth,(req,res)=>{
res.status(200).send('About');
});


route.post('/login',async (req,res)=>{

  const {email,password}=req.body;



   try {

    if(!email && password){
      res.status(233).json({con:233});
    }

    if(!password && email){
      res.status(234).json({con:234});

    }
    
   if(!email || !password){
    console.log(email)
    console.log(password)

    res.status(400).json({con:400});
   }

 


   let userdata=await User.findOne({email:email});


     
    if(userdata){
     
      const Match=await bcrypt.compare(password,userdata.password);
       
         let token=await userdata.getTokens();
  
          res.cookie('jwt',token,{
            httpOnly:true,
            secure:false,
          });


          if(Match){
            res.status(200).json({con:200});
          }else{
            res.status(300).json({con:300});
          }

    }else{
      res.status(250).json({con:250});
    }


   } catch (error) {
    console.log('email error');
   }

})




module.exports=route;