var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('node-uuid');


//自定义模块引用
var routes = require('./routes/index');
var users = require('./routes/users');
var config = require("./config.json");
var merchantApi = require('./servers/apis/merchantApi');
var sysApi = require('./servers/apis/sysApi');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine("html", require('ejs').renderFile);

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/img/favicon.ico'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//业务需要引入模块
///////////////////////////
//自定义初始化内容
//app.use(cookieParser("youfan-platform"));
//app.use(session({
//    genid: function (req) {
//        return uuid.v4();// use UUIDs for session IDs
//    },
//    secret: 'youfan-platform',
//    name: 'id',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
//    cookie: {maxAge: 80000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
//    resave: true,
//    saveUninitialized: true,
//}));
//
//
//// 登陆信息
//app.use(function (req, res, next) {
//    console.log("登录控制")
//    if (req.session.user) {
//        console.log("跳转到登录")
//        req.render("login.html", {});
//        //next();
//    } else {
//        next();
//    }
//})

//
app.use('/', routes);
app.use('/users', users);
app.use('/merchant', merchantApi);
app.use('/sys', sysApi);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.get('/', routes);
app.listen(3000);
module.exports = app;
