/**
 * Created by Administrator on 2015/8/17.
 */

var express = require('express');
var api = express.Router();
var http = require("http");
var httpUtil = require("../utils/httpUitl")
api.get("/login", function (req, res) {
    console.log("测试Login接口")
    //var options = {
    //    hostname: '192.168.1.107',
    //    port: 8080,
    //    path: '/platform/admin/123456',
    //    method: 'GET'
    //};
    //httpUtil.httpGet(res, options, function (chunk) {
    //    console.log('BODY: ' + chunk);
    //    res.end(JSON.stringify(chunk), function (err) {
    //        if (err) {
    //            console.log(err)
    //        }
    //    });
    //}, function (e) {
    //    console.log('problem with request: ' + e.message);
    //});
    res.render("main.html",{});
});
module.exports = api