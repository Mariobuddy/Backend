const dotenv=require('dotenv');
dotenv.config();

const {PORT,MongoConnect,Auto}=process.env;

module.exports={PORT,MongoConnect,Auto};