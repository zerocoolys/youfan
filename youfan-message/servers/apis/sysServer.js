/**
 * Created by Administrator on 2015/8/24.
 */

var express = require('express');
var api = express.Router();
var http = require("http");
var url = require('url');
//系统连接池
api.sysConns = {}
//客户端连接池
api.clientConns = {};
//商家端连接池
api.merchantConns = {};
var sysMsgId =0;
/**
 * 系统账户发布点对点消息
 */
api.get("/send", function (req, res) {
    var query = url.parse(req.url, true).query;
    var toConn = null;
    if (query.toPort == 2)
        toConn = api.clientConns["CLIENT" + query.toId];
    else if (query.toPort == 3)
        toConn = api.merchantConns["MERCHANT" + query.toId];
    else
        return;
    //此处该使用Redis中保存的用户-conn.id来替换掉
    if (toConn != undefined) {
        var sendMsg = {
            msgId: sysMsgId++,
            fromPort: 1,
            data: {info: query.data},
        }
        //console.log(sendMsg)
        toConn.emit("message", sendMsg);
        res.end(JSON.stringify(sendMsg),function(err){})
    } else {
        res.end(JSON.stringify(sendMsg),function(err){})
    }
});
module.exports = api