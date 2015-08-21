/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('messageCtrl',function ($scope, $rootScope, $q,$state,$http,$location) {
        console.log("messageCtrl")

        $scope.message = {
            msgTarget : [],//消息发送对象 取值：[client],[merchant]
            msgContent:"",//消息内容
            msgSendPlan:[{
                sendMethod:[],//消息推送方法 取值：[SYS,SMS]
                sendTime:[],//消息计划推送时间
            }]//消息推送计划
        }
    })
});
