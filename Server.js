const {PORT}=require('./Config/secret');
require('./Database/MongoConnection');
const express=require('express');
const app=express();
const route=require('./Router/routes');
const cors=require('cors');
const bodyparser=require('body-parser');
const cookieparser=require('cookie-parser');
app.use(cookieparser());
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({extended:false}));
app.use(express.urlencoded({extended:false}));

app.use(cors({
    credentials:true,
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
    origin: 'http://localhost:3000'
}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(route);

app.listen(PORT,()=>{
    console.log(`Server is started on ${PORT}`);
});


