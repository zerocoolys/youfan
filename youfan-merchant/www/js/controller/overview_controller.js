(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('overview', Overview);

    function Overview($scope, $filter, $state, $ionicPopup, $rootScope, $location,YF_MERCHANT_HOST,YF_MERCHANT_INFO,$http) {


        $scope.loadHeaderData = {};

        $scope.callPhone = function () {
            $window.location.href = "http://my.oschina.net/u/1416844/blog/tel:10085";
        };


        $scope.goToDishes = function (path) {
            $state.go('dishes', {'path': path});
        }

        $scope.showPopup = function () {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: ' <ion-list> <ion-item  href="#/add_tables" ng-click=" myPopupclose()">三人小饭桌</ion-item> <ion-item href="#/add_table" ng-click=" myPopupclose()">五人小饭桌</ion-item></ion-list>',
                title: '<p class="calm">添加小饭桌</p>',
                subTitle: '',
                scope: $scope,
                buttons: []


            });
            $scope.myPopupclose = function () {
                myPopup.close();
            }

        }
        $rootScope.GuideSecond = true;
        $rootScope.GuideThird = true;
        $rootScope.CourseClose = function () {
            $rootScope.CourseNone = true;
        }
        $rootScope.GuideBack = function () {
            $rootScope.CourseNone = true;
            $rootScope.GuideSecond = true;
            $rootScope.GuideThird = true
        }
        $rootScope.GuideClose = function () {
            $rootScope.CourseNone = true;
            $rootScope.GuideSecond = true;
            $rootScope.GuideThird = true;
        }
        $rootScope.GuideSecondCircle = function () {
            $location.path("/editkitchen");
            $rootScope.CourseNone = true;
            $rootScope.GuideThird = true;
        }
        $rootScope.GuideThirdCircle = function () {
            $location.path("/manage/dishes/nsc");
            $rootScope.CourseNone = true;
            $rootScope.GuideThird = true;
        }



        $scope.disposeHeaderData = function (data) {
            if(data == null) {
                return;
            }
            $scope.loadHeaderData =data;
        }


        $scope.loadHeaderData = function () {
            var url = YF_MERCHANT_HOST+"/orders/overview/merchant?";
            var merchant = {};

            url = url+"sellerId="+YF_MERCHANT_INFO.mID;
            console.log(url);

            $http.get(url).success
            (function (res) {

                if(res == null) {
                    alert("网络链接异常，请检查!");
                    return;
                }
                if(res.code == 1) {
                    alert("数据异常，请稍等!");
                    return;
                }
                $scope.disposeHeaderData(res.payload);
            });
        }


        $scope.loadHeaderData();


    }
})();
