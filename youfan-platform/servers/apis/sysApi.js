var express = require('express');
var api = express.Router();
var http = require("http");
var httpUtil = require("../utils/httpUitl")
var url = require('url');

api.get("/getOrder", function (req, res) {
    var query = url.parse(req.url, true).query;
    var path = "/pBusiness/sys"+req.url+"";
    console.log(path)
    httpUtil.httpGet(res, path, 'GET');
});

api.get("/saveCouponsType", function (req, res) {
    var query = url.parse(req.url, true).query;
    var path = "/pBusiness/sys"+req.url+"";
    console.log(path)
    httpUtil.httpGet(res, path, 'GET');
});

api.get("/getCouponsType", function (req, res) {
    var query = url.parse(req.url, true).query;
    var path = "/pBusiness/sys"+req.url+"";
    console.log(path)
    httpUtil.httpGet(res, path, 'GET');
});

api.get("/saveActive", function (req, res) {
    var query = url.parse(req.url, true).query;
    var path = "/pBusiness/sys"+req.url+"";
    console.log(path)
    httpUtil.httpGet(res, path, 'GET');
});
api.get("/getActive", function (req, res) {
    console.log("getActive")
    var query = url.parse(req.url, true).query;
    var path = "/pBusiness/sys"+req.url+"";
    console.log(path)
    httpUtil.httpGet(res, path, 'GET');
});
api.get("/updateActive", function (req, res) {
    console.log("getActive")
    var query = url.parse(req.url, true).query;
    var path = "/pBusiness/sys"+req.url+"";
    console.log(path)
    httpUtil.httpGet(res, path, 'GET');
});
module.exports = api