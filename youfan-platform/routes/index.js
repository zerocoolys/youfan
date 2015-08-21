var express = require('express');
var router = express.Router();

//

router.get("/", function (req, res, next) {
    res.render("main.html",{});
});
router.get("/login", function (req, res, next) {
    res.render("login.html", {});
});

router.get("/pay", function (req, res, next) {
    res.render("pay/pinus_webview.html", {});
});

router.get("/paysuccess", function (req, res, next) {
    res.render("pay/paysuccess.html", {});
});


router.get('/*.html', function (req, res, next) {
    var url = req.url.substring(1);
    console.log("go html" + url)
    if (!url)
        url = "index";
    res.render((url.indexOf(".html")) > -1 ? url : url + ".html", {});
});

module.exports = router;
