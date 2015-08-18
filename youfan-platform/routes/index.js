var express = require('express');
var router = express.Router();

//router.get("/", function (req, res, next) {
//
//  //判定是否登录决定跳转方向
//  console.log("未登录跳转到登录页面")
//  res.redirect('/login');
//});
router.get("/login", function (req, res, next) {
    res.render("login.html", {});
});

router.get("/", function (req, res, next) {
    res.render("main.html", {});
});


//router.get("/login", function (req, res, next) {
//    res.render("login.html", {});
//});
//
////运营平台管理
//router.get("/sys", function (req, res, next) {
//    res.render("sys/main.html", {});
//});
//router.all("/sys/:syspage", function (req, res, next) {
//    if (req.params.syspage == undefined)
//        res.render("sys/main.html");
//    else
//        res.render("sys/" + req.params.syspage + ".html");
//});
////客户端管理
//router.all("/client/:clientpage", function (req, res, next) {
//    if (req.params.clientpage == undefined)
//        res.render("client/clientinfo.html");
//    else
//        res.render("client/" + req.params.clientpage + ".html");
//});
////商家端管理
//router.all("/merchant/:merchantpage", function (req, res, next) {
//    if (req.params.merchantpage == undefined)
//        res.render("sys/clientinfo.html");
//    else
//        res.render("sys/" + req.params.merchantpage + ".html");
//});

router.get('/*.html', function (req, res, next) {
    if (req.url != "/conf.html") {
        var url = req.url.substring(1);
        if (!url)
            url = "index";

        res.render((url.indexOf(".html")) > -1 ? url : url + ".html", {});
    } else {
        res.render("configindex.html", {});
    }

});

module.exports = router;
