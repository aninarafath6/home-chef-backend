var path = require('path');
var express =require('express');
var db = require('./config/connection')
var cors = require('cors');
var app =express();


var admin_router = require('./routes/admin.js');
var sale_router = require('./routes/sale_report');


app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));

app.use('/', sale_router);

app.use('/', admin_router);

db.connect((err)=>{
    if(err) throw err;
    console.log("connected to database");
});

const PORT = process.env.PORT || 3008;
app.listen(PORT,console.log(`connected to ${PORT}`));





