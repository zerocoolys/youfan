ControllerModule.controller('DashCtrl', function ($scope, $http, REST_URL, Merchant, $state, $ionicModal, $rootScope) {
    //console.log(Merchant.localRange + "<<<<<<<<")
    $rootScope.hideTabs = false;
    $scope.SearchShow = true;
    $scope.SearchIcon = function () {
        $scope.SearchShow = false;
    };
    $scope.blur = function () {
        $scope.SearchShow = true;
    }
    //下拉刷新
    $scope.doRefresh = function () {
        /*   $scope.todos.unshift({name: 'Incoming todo ' + Date.now()})*/
        $scope.initMerchant(function () {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    //地图信息初始化加载
    $scope.mapObj = new AMap.Map("mapContainer", {
        resizeEnable: true
    });
    $scope.loadMore = function () {
        //console.log('loadMore');
    }
    $scope.moreDataCanBeLoaded = function () {
        //console.log("loadComplete")
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }
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
        mapTools.getUserLngLat($scope.mapObj, function (data) {
            var per = {};
            var p = {}
            if (Merchant.localRange) {
                per["lng"] = Merchant.localRange.split(",")[0];//104.069624;//
                per["lat"] = Merchant.localRange.split(",")[1];//30.522269;//
                per["scope"] = 300;
                p["params"] = per
                Merchant.localRange = undefined;
            } else {
                per["lng"] = data.split(",")[0];//104.070091;//
                per["lat"] = data.split(",")[1];//30.510871;//
                per["scope"] = 300;
                p["params"] = per
            }
            $http.post(REST_URL + "/mr/getGeographical", p).success(function (result) {
                if (result.payload.list.length) {
                    result.payload.list.forEach(function (item) {
                        item["src"] = "img/1.jpg";
                        item["headImg"] = "img/avatar1.jpg";
                        item["loc"] = parseFloat(item['location']).toFixed(1) + "km";
                        $scope.merChantData.push(item);
                    });
                    if (cp) {
                        cp();
                    }
                }
            });
        });
    }
    $scope.initMerchant();
    $scope.goTo = function (_mki) {
        Merchant.mki = _mki;
        $state.go("tab.dash-detail");
    }

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

    //搜索基本参数
    $scope.inputText = {value: ""};

    $scope.tab_keydown = function (data) {
        if (data == undefined) {
            return
        } else if (data == "") {
            $scope.initMerchant();
            return
        }
        $http.get(REST_URL + "/mr/getKitchenByName/" + data).success(function (result) {
            if (result.payload.length) {
                $scope.merChantData = [];
                result.payload.forEach(function (item, i) {
                    item["src"] = "img/1.jpg";
                    item["headImg"] = "img/avatar1.jpg";
                    $scope.merChantData.push(item);
                })
            }
        });
    }


});
