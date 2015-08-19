/**
 * Created by Administrator on 2015/8/19.
 */
var token = require('express').Router();

token.post("/", tokener)
token.get("/", tokener)

function tokener(req, res, next) {

    var tokenid = req.query['tokenid'];
    console.log("Token 验证" +tokenid)
    console.log(req.headers.cookie)
    //if(tokenid==undefined){
    //    res.render("login.html", {});
    //}else{
        res.render("main.html", {});
    //}
}
module.exports = token;