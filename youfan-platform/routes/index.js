var express = require('express');
var router = express.Router();

//router.get("/", function (req, res, next) {
//
//  //判定是否登录决定跳转方向
//  console.log("未登录跳转到登录页面")
//  res.redirect('/login');
//});
router.get("/", function (req, res, next) {
    res.render("login.html", {});
});

router.get("/login", function (req, res, next) {
    res.render("login.html", {});
});

router.get("/index", function (req, res, next) {
    res.render("index.html", {});
});

router.get("/*.html", function (req, res, next) {
    if (req.url != "/conf.html") {
        var url = req.url.substring(1);
        if (!url)
            url = "index";
        res.render((url.indexOf(".html")) > -1 ? url : url + ".html", {});
    } else {
        res.render("login.html", {});
    }
});

router.get('/reg.html', function (req, res, next) {
    console.log("reg.html")
    res.render("reg.html", {});
});

//router.get("/index", function (req, res, next) {
//  res.render("index.html", {});
//});
////router.get("/user",function(req,res){
////  res.send( 'Hello ,游客' );
////});
//
//router.all("/login",function(req,res,next){
//  console.log("用户登录")
//  res.render("login.html", {});
//})
//router.all("/reg",function(req,res,next){
//  console.log("用户注册")
//  res.render("reg.html", {});
//})
//router.all("/user/:username",function(req,res,next){
//  console.log("检查用户名："+req.params.username)
//  next();
//})
////一个路径绑定多个路由响应
//router.get("/user/:username",function(req,res,next){
//  //res.send( 'Hello ,'+req.params.username );
//  console.log("一个路径多个路由  Next响应")
//  next();
//});
//router.get("/user/:username",function(req,res){
//  res.send( req.params.username+" now is:"+new Date().toString() );
//});
module.exports = router;
