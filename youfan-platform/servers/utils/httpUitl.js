/**
 * Created by Administrator on 2015/8/17.
 */
var express = require('express');
var api = express.Router();
var http = require("http");
var httpUtil = {
    httpGet:function(res,options,scb,ecb){
        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                scb(chunk);
            });
        });
        req.on('error', function (e) {
            ecb(e)
        });
        req.end();
    }
}
module.exports = httpUtil