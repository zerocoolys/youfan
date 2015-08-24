//引入程序包
var express = require('express')
var path = require('path')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var uuid = require("node-uuid")
//var redis = require('redis');
//var url = require('url');
var sysServer = require('./servers/apis/sysServer');
//Redis服务启动
//var redisclient = redis.createClient(6379, "182.92.227.23", {
//    "auth_pass": "3edcvfr4"
//});
//消息结构
/**
 * 消息体
 {
     fromPort:消息来源端 取值为  1，服务器端，2，客户端，3商家端
     fromId:消息来源帐号, 若值为1代表 服务器直接回复消息
     toPort:消息来源端 取值为  1，服务器端，2，客户端，3商家端
     toId:消息接收帐号,
     code:消息类型,
     msgId:消息编号,
     data:消息内容
 }
 */
//客户端连接池
var clientConns = {};
//商家端连接池
var merchantConns = {};


//设置消息编号用于处理需要回执的消息
var sysMsgId = 0;
//设置日志级别
io.set('log level', 1);
//WebSocket连接监听
io.on('connection', function (socket) {
    //通知客户端已连接
    socket.emit('open', {
        code: 0,
        msgId: sysMsgId++,
        fromPort: null,
        fromId: 1,
        toPort: null,
        data: "Connect Success",
    });
    var userName = "";
    var port ;
    // 对message事件的监听
    socket.on('message', function (msg) {
        console.log(msg)
        switch (msg.code) {
            case 0://未登录，非认证请求消息 丢弃
                return;
            case 1://登录认证请求消息
                //msg中包含登录名称
                if (msg.data.userName == undefined || msg.data.userName == "")
                    return;
                //console.log(msg.fromPort + " 端" + msg.data.userName + "登录")
                var sendMsg = {
                    msgId: sysMsgId++,
                    code: 1,
                    data: {info: "welcome "},
                }
                port = msg.fromPort
                switch (msg.fromPort) {
                    case 2:
                        clientConns["CLIENT" + msg.data.userName] = socket;
                        userName= "CLIENT" + msg.data.userName;
                        sendMsg.data.info = sendMsg.data.info + "用户 " + msg.data.userName + " 登录"
                        break;
                    case 3:
                        merchantConns["MERCHANT" + msg.data.userName] = socket;
                        userName =  "MERCHANT" + msg.data.userName;
                        sendMsg.data.info = sendMsg.data.info + "商家 " + msg.data.userName + " 登录"
                        break;
                    default :
                        return;
                }
                socket.emit("message", sendMsg);
                break;
        }
    });
    /**
     *  监听出退事件
     *  从连接池中删除对应连接
     */
    socket.on('disconnect', function () {
        // 广播用户已退出
        if(port ==2){
            delete clientConns[userName]
        }else if(port==3){
            delete merchantConns[userName]
        }
        //console.log(socket.conn.id + 'Disconnect');
    });
})
sysServer.clientConns = clientConns;
sysServer.merchantConns = merchantConns;

app.use('/message', sysServer);
server.listen(8000, function () {
    console.log("Express server listening on port 8000" );
});
