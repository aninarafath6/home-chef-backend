var path = require('path');
var express =require('express');
var db = require('./config/connection')
var cors = require('cors');
var app =express();
var fileUploder = require('express-fileupload');


var admin_router = require('./routes/admin.js');
var sale_router = require('./routes/sale_report');
var isLogged = require('./routes/isLogged');
var authenticate = require('./routes/authentiacte')

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUploder())


app.use('/', sale_router);
app.use('/', admin_router);
app.use('/', isLogged);
app.use('/auth', authenticate);

db.connect((err)=>{
    if(err) throw err;
    console.log("connected to database");
});

const PORT = process.env.PORT || 3008;
app.listen(PORT,console.log(`connected to ${PORT}`));





