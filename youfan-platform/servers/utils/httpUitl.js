/**
 * Created by Administrator on 2015/8/17.
 */
var express = require('express');
var api = express.Router();
var http = require("http");
var httpUtil = {
    httpGet: function (locres, path, method) {
        var options = {
            hostname: '127.0.0.1',
            port: 8080,
            path: path,
            method: method
        };
        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
                locres.end(chunk, function (err) {
                });
            });
        });
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
            locres.end([], function (err) {
            });
        });
        req.end();
    }
}
module.exports = httpUtil