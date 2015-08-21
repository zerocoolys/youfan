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
});

api.get("/merchant/getInfos", function (req, res) {
    console.log("获取商家信息接口")
        var tdata = [
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"}
        ]
    send(res,tdata);
});

api.get("/merchant/getPays", function (req, res) {
    console.log("获取商家信息接口")
    var tdata = [
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"},
        {name: "小李", address: "四川", phone: "1234567890", status: "正常"}
    ]
    send(res,tdata);
});

api.get("/merchant/pay", function (req, res) {
    console.log("打款到商家帐号接口")

    var options = {
        hostname: '192.168.1.107',
        port: 8080,
        path: '/platform/pay',
        method: 'GET'
    };
    httpUtil.httpGet(res, options, function (chunk) {
        console.log('BODY: ' + chunk);
        res.end(JSON.stringify(chunk), function (err) {
            if (err) {
                console.log(err)
            }
        });
    }, function (e) {
        console.log('problem with request: ' + e.message);
    });
    send(res,tdata);
});

api.get("/pay", function (req, res) {
    console.log("付款接口测试")
    var options = {
        hostname: '127.0.0.1',
        port: 8080,
        path: '/platform/pay?amount=100&order_no=934ud2d363323&channel=alipay_wap&currency=cny&client_ip=127.0.0.1&subject=subject&body=body',
        method: 'GET'
    };
    httpUtil.httpGet(res, options, function (chunk) {
        console.log('BODY: ' + chunk);
        res.end(JSON.stringify(chunk), function (err) {
            if (err) {
                console.log(err)
            }
        });
        send(res,chunk);
    }, function (e) {
        console.log('problem with request: ' + e.message);
    });

});



var send = function (res, obj) {
    res.end(JSON.stringify(obj), function (err) {
        if (err) {
            console.log(err)
        }
    });
}
module.exports = api