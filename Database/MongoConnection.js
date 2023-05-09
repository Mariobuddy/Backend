const mongoose=require('mongoose');
const {MongoConnect}=require('../Config/secret');

mongoose.connect(MongoConnect,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`Database is started`);
}).catch((err)=>{
    console.log(err);
})