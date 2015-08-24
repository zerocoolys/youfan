/**
 * Created by Administrator on 2015/8/24.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('chatCtrl', function ($scope, $rootScope, $q, $state, $http, $location, $window) {
        console.log("chatCtrl")
        $scope.connStatus = "未连接";

        $scope.loginStatus = "未登录"
        $scope.count = "";
        $scope.fromPort = "";
        $scope.sMsg = "";
        $scope.toPort = "";
        $scope.toClient = "";
        $scope.rMsg = "";
        var socket = null;
        //收到server的连接确认
        $scope.connServer = function () {
            socket = io.connect('http://192.168.1.102:8000');
            socket.on('open', function (msg) {
                console.log("连接成功 ")
                $scope.connStatus = "已连接"
            });
            socket.on('system', function (json) {
                console.log("system:" + json)
            });
            //监听message事件，打印消息信息
            socket.on('message', function (json) {
                console.log("接收到系统消息" + JSON.stringify(json))
                $scope.rMsg = $scope.rMsg + "   " + "接收到系统消息" + JSON.stringify(json);
            });
        }
        $scope.login = function () {
            socket.send({code: 1, fromPort: Number($scope.fromPort), data: {userName: $scope.count}});
        }
        $scope.sendMsg = function () {
            socket.send({code: 2, fromPort: Number($scope.fromPort),toPort: Number($scope.toPort), toId: $scope.toClient, data: {info: $scope.sMsg}});
        }
    })
});