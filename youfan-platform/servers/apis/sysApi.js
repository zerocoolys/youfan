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

module.exports = api