/**
 * Created by Administrator on 2015/8/14.
 */
//х╗оч
var app = angular.module('app', [
    'ngRoute',
    'app.Authority',
    //'app.SysManager',
    //'app.ClientManager',
    //'app.MerchantManager',
])

app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/.html',
            controller: 'RouteListCtl'
        })
        .when('/list/:id', {
            templateUrl: 'views/route/detail.html',
            controller: 'RouteDetailCtl'
        })
        .otherwise({
            redirectTo: '/list'
        });
    console.log("router")
}])