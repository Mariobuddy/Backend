const mongoose=require('mongoose');
const validator=require('validator');
const {Auto}=require('../Config/secret');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');



const Schema=new mongoose.Schema({

name:{
    type:String,
    required:true,
    minLength:3,
    maxLength:15
},

surname:{
    type:String,
    required:true,
    minLength:3,
    maxLength:15
},

email:{
    type:String,
    required:true,
    unique:true,
    validate(val){
        if(!validator.isEmail(val)){
            throw new Error('Email is not valid');
        }
    }
},

number:{
    type:Number,
    required:true,
    min:10,
},

password:{
    type:String,
    required:true,
    minLength:6,
},

cpassword:{
    type:String,
    minLength:6,
    required:true
},

Token:[
    {
        token:{
        type:String,
        required:true
        }
    }
],



});

Schema.pre('save',async function(next){
    try {

    if(this.isModified('password')){
    this.password=await bcrypt.hash(this.password,12);
    this.cpassword=await bcrypt.hash(this.cpassword,12);

}
    next();
    } catch (error) {
        console.log('password is not hash');
    }
});



Schema.methods.getTokens=async function(){

try{

let token=jwt.sign({_id:this._id},Auto);

this.Token=await this.Token.concat({token:token});

await this.save();

return token;

    } catch (error) {
        console.log('token is not created');
    }

};





Schema.methods.Storeit=async function(name,email,message){

 try {

    this.messages=this.messages.concat({name,email,message});

    await this.save();

    return this.messages;

 } catch (error) {

    console.log(error);
 }



}

Schema.methods.GetCart=async function(idchan,price,gcount,gtick,SingleProduct){
    try {
        this.carts=this.carts.concat({id:idchan,price,amount:gcount,color:gtick,data:SingleProduct});

        await this.save();

        return this.carts;
        
    } catch (error) {
        console.log(error)
    }

}




const User=mongoose.model('user',Schema);


module.exports=User;