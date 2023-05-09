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
    maxLength:10
},

surname:{
    type:String,
    required:true,
    minLength:3,
    maxLength:10
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

age:{
    type:Number,
    required:true,
    min:1,
},

gender:{
    type:String,
    required:true,
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
    maxLength:15
},

cpassword:{
    type:String,
    minLength:6,
    maxLength:15,
    required:true
},

Token:[
    {
        token:{
        type:String
        }
    }
]

});

Schema.pre('save',async function(next){
    try {
    this.password=await bcrypt.hash(this.password,12);
    this.cpassword=await bcrypt.hash(this.cpassword,12);
    console.log('password is hash');
    next();
    } catch (error) {
        console.log('password is not hash');
    }
})



Schema.methods.getTokens=async function(){

    try {
let signing=jwt.sign({_id:this._id},Auto);

this.Token=await this.Token.concat({token:signing});

console.log('token generated');
return signing;

    } catch (error) {
        console.log('token is not created');
    }

};



const User=mongoose.model('user',Schema);



module.exports=User;