var express = require('express');
var api = express.Router();
var http = require("http");
var httpUtil = require("../utils/httpUitl")
var url = require('url');

api.get("/getByStatus", function (req, res) {

    var query = url.parse(req.url, true).query;
    var status = query['status'];
    var path = "/pBusiness/merchant/getByStatus?status="+status;
    httpUtil.httpGet(res, path, 'GET');
});

api.get("/getInfos", function (req, res) {
    console.log("获取商家信息")
    httpUtil.httpGet(res, "", "get", function (chunk) {
        httpUtil.send(res, chunk);
    });
});

api.get("/getPays", function (req, res) {
    console.log("获取商家信息接口")
    var tdata = [
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"}
    ]
    send(res, tdata);
});
api.get("/getDishes", function (req, res) {
    console.log("获取商家信息接口")
    var tdata = [
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"}
    ]
    send(res, tdata);
});

api.get("/pay", function (req, res) {
    console.log("打款到商家帐号接口")
    httpUtil.httpGet(res, "", "get", function (chunk) {
        httpUtil.send(res, chunk);
    });
});

module.exports = api