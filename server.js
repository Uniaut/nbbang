var express = require('express');
var app = express();
var session = require('express-session');
var fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(8080, function(){
    console.log("Express server has started on port 8080")
});

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

var router = require('./router/main')(app, fs);
var addBillBookRouter = require('./router/addBillBook')(app,fs);
