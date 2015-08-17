// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('starter', ['ionic'])
//
//    .run(function ($ionicPlatform) {
//        $ionicPlatform.ready(function () {
//            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//            // for form inputs)
//            if (window.cordova && window.cordova.plugins.Keyboard) {
//                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//            }
//            if (window.StatusBar) {
//                StatusBar.styleDefault();
//            }
//        });
//    });


//angular.module('login', ['ionic'])
//
//    .controller('login', function ($scope, $http) {
//        $scope.signIn = function (user) {
//            //var login_url = "youfan-server/login?user={'userName':\'" + user.username + "\','passWord':\'" + user.password + "\'}";
//            //$http(login_url).success(function (data) {
//                $scope.isSuccess = user.username;
//            //});
//        }
//    });
//
//    //.factory('loginService', function ($http) {
//    //    return {
//    //        GetUser: function () {
//    //            return $http.get("some url here").then(function (response) {
//    //                //Process Stuff Here
//    //                return response;
//    //            });
//    //        },
//    //    }
//    //})
//angular.module('editKitchener', ['ionic'])
//
//    .controller('editKitchener', function ($scope, $http) {
//
//    });
//    //
//    //.factory('editKitchenerService', function ($http) {
//    //    return {
//    //        GetUser: function () {
//    //            return $http.get("some url here").then(function (response) {
//    //                //Process Stuff Here
//    //                return response;
//    //            });
//    //        },
//    //    }
//    //})
angular.module('editKitchenInfo', ['ionic'])
    .controller('editKitchenInfo', function ($scope) {
        //$scope.test = function(){
        //    editKitchenInfoerService.saveKitchenInfo($scope.kitchenInfo).then(function (response) {
        //        $scope.kitchenInfo = response;
        //    });
        //}
        $scope.name = "tutyutuytyu";
        //$scope.testfun = function(){
        //    $scope.test = 2;
        //    //$http.get("http://www.baidu.com").success(function(data){
        //    //    $scope.test = 1;
        //    //});
        //};
        //$scope.testfun();
    });

