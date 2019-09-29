const express = require('express');
const path = require('path');
const morgan = require('morgan');
const ejs = require('ejs');


//Init
const app  = express();
//Setting
app.set('port', process.env.PORT || 3000 );
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended : false}));
app.use(express.json());
//view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
//Statict files
app.use(express.static(path.join(__dirname,'public')));
//Router
app.use(require('./routes/index'));
//404 handler
app.use((req,res,next)=>{
    res.status(404).render('404');
})






//Export
module.exports = app;