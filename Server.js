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
    origin: '*'
}));


app.use(route);

app.listen(PORT,()=>{
    console.log(`Server is started on ${PORT}`);
});


