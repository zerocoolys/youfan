/**
 * Created by Administrator on 2015/8/14.
 */

//注册，系统管理 应该用不到
//angular.module('app.Authority', []).controller('regCtrl', function ($scope) {
//    console.log("regCtrl")
//});
//
////修改信息
//angular.module('app.Authority', []).controller('editCtrl', function ($scope) {
//    console.log("regCtrl")
//});
//登录
angular.module('app.Authority', []).controller('loginCtrl', function ($scope) {
    console.log("loginCtrl")
    $scope.count = "admin"

    //登录
    $scope.login = function () {
        console.log("login")
        //$state.go("index.html");
    }
})

//退出
//angular.module('app.Authority', []).controller('logoutCtrl', function ($scope) {
//    console.log("logoutCtrl")
//});