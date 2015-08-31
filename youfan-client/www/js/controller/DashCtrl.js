ControllerModule.controller('DashCtrl', function ($scope, $http, REST_URL, Merchant, $state, $ionicModal, $rootScope) {
    $rootScope.hideTabs = false;
    //下拉刷新
    $scope.doRefresh = function () {
        /*   $scope.todos.unshift({name: 'Incoming todo ' + Date.now()})*/
        $scope.initMerchant(function () {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    //$scope.testData = {
    //    uId: "12123sadfasfdd",
    //    mrName: '动态念家厨房32',
    //    myInterest: '动态我的爱好32',
    //    mrStoryTitle: '我的动态故事标题32',
    //    mrFeature: '厨房特色32',
    //    typeCode: 001,
    //    galleryful: 0,
    //    disPrice: 2.00,
    //    disRange: '0-1km',
    //    distribution: '只送办公大楼',
    //    startTime: new Date(),
    //    endTime: new Date(),
    //    desc: '动态厨房备注2',Merchant
    //    dataStatus: 0
    //};
    $scope.merChantData = [];
    $scope.initMerchant = function (cp) {
        $http.get(REST_URL + "/mr/getMrData").success(function (result) {
            if (result.data.length) {
                result.data.forEach(function (item) {
                    item["src"] = "img/1.jpg";
                    item["hsrc"] = "img/avatar1.jpg";
                    $scope.merChantData.push(item);
                });
                if (cp) {
                    cp();
                }
            }
        });
    }
    $scope.initMerchant();
    /**
     * 验证码登陆
     */
//    $ionicModal.fromTemplateUrl('templates/user-register.html', {
//        scope: $scope
//    }).then(function (modal) {
//        $scope.verifyLogin = modal;
//    });

    /**
     * 密码登陆
     */
//    $ionicModal.fromTemplateUrl('templates/pwd-login.html', {
//        scope: $scope
//    }).then(function (modal) {
//        $scope.pwdLogin = modal;
//    });

    /**
     * 用户协议
     */
    $ionicModal.fromTemplateUrl('templates/user-agreement.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.userAgreement = modal;
    });


    //地图信息初始化
    $scope.mapObj = new AMap.Map('mapContainer', {
        resizeEnable: true
    });

    /**
     * 获取当前城市名称
     * 返回参数存放在 $rootScope.mapCity
     */
    mapTools.cityLocation($scope, $rootScope, $scope.mapObj);

});
