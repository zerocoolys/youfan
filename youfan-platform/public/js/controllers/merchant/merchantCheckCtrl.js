/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('merchantCheckCtrl',function ($scope, $rootScope, $q,$state,$http,$location) {
        $scope.merchants = [
            {name:"小李",address:"四川",phone:"1234567890",status:"正常",},
            {name:"小李",address:"四川",phone:"1234567890",status:"正常",},
            {name:"小李",address:"四川",phone:"1234567890",status:"正常",},
            {name:"小李",address:"四川",phone:"1234567890",status:"正常",},
            {name:"小李",address:"四川",phone:"1234567890",status:"正常",}
        ]
    })
});
