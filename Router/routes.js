const route=require('express').Router();
const User=require('../Database/Schema');
const bcrypt=require('bcrypt');
const Auth=require('../Middleware/auth');



route.post('/register', async(req,res)=>{
     


    const {name,surname,number,cpassword,password,email}=req.body;

    try {
        
        let userdata=await User.find({email:email});
         
        if(!name || !surname ||!number ||!email  ||!cpassword ||!password){
         res.status(500).json({con:500});
         return;
        }

         if(userdata.length!==0){
          res.status(300).json({con:300});
          return;
         }


     
        if(password===cpassword){

            userdata=new User({
            name,surname,number,email,cpassword,password
          });  
  
          await userdata.save();
           
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
try {
  res.status(200).send(req.maindata);
} catch (error) {
  res.status(400).send('Error');
}
});


route.post('/cart',Auth,async(req,res)=>{

  const {idchan,price,gcount,gtick,SingleProduct}=req.body;

 try {
   
  let userdata=await User.findOne({_id:req.userID});

  let carting=await userdata.GetCart(idchan,price,gcount,gtick,SingleProduct);

  await userdata.save();

  res.status(200).json({con:200});
  
 } catch (error) {
  res.status(400).json({con:400});

  
 }

});

route.delete('/deletecart',(req,res)=>{

  try {
    

    res.status(200).json({con:200});
  } catch (error) {
    res.status(400).json({con:400});
  }

})

route.post('/contact',Auth,async(req,res)=>{

  const {name,email,message}=req.body;

 
  try {


    let userdata= await User.findOne({_id:req.userID});


    if(userdata){

      
      let storedata=await userdata.Storeit(name,email,message);

      await userdata.save();

      res.status(200).json({con:200});

    }

  } catch (error) {
    console.log(error);
    res.status(400).json({con:400});
  }

})


route.get('/loginout',Auth,(req,res)=>{
  try {
    res.clearCookie('jwt',{path:'/'});
    res.status(200).json({con:200});
    
  } catch (error) {
    res.status(400).json({con:400});
  }
})



route.get('/info',Auth,(req,res)=>{
  try {
    res.status(200).send(req.maindata);
  } catch (error) {
    res.status(400).send('Error');
  }
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
    res.status(400).json({con:400});
   }

 


   let userdata=await User.findOne({email:email});

     
    if(userdata){
     
      const Match=await bcrypt.compare(password,userdata.password);
      
      let token=await userdata.getTokens();

  
           res.cookie('jwt', token, {
           httpOnly: true,
           secure: false,
         });
       
         await userdata.save();



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