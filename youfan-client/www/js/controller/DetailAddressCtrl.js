/**
 * Created by subdong on 15-9-7.
 */
ControllerModule.controller('DetailAddressCtrl', function ($scope, $http, REST_URL, Merchant, $state, $ionicPopup, $timeout, $ionicModal, $rootScope) {
    //加载地图，调用浏览器定位服务
    $scope.mapObj = new AMap.Map('mapContainer', {
        resizeEnable: true,
        view: new AMap.View2D({
            zoom: 16 //地图显示的缩放级别
        })
    });
    mapTools.getUserLngLat($scope.mapObj, function (item) {
        $scope.marker = new AMap.Marker({
            icon: "./img/location.png",
            position: new AMap.LngLat(item.split(",")[0], item.split(",")[1])
        });
        $scope.marker.setMap($scope.mapObj);  //在地图上添加点

        $scope.initMap = function () {

            $scope.datas = [];
            mapTools.nearbySearch(item.split(",")[0], item.split(",")[1], function (data) {
                if (data) {
                    data.forEach(function (item, i) {
                        $scope.datas.push({
                            name: item.name,
                            addr: item.address,
                            lngLat: item.location.lng + "," + item.location.lat
                        });
                    });
                    $scope.$apply(function () {
                        $scope.datas
                    });
                }
            })
        };
        $scope.initMap();

        //通过地图的dragstart、dragging、dragend事件切换鼠标拖拽地图过程中的不同样式
        $scope.mapObj.on('dragging', function (e) {
            var mapCenter = $scope.mapObj.getCenter();
            var dataXY = [mapCenter.getLng(), mapCenter.getLat()];
            $scope.marker.setPosition(dataXY);

        });
        $scope.mapObj.on('dragend', function (e) {
            var mapCenter = $scope.mapObj.getCenter();
            $scope.datas = [];
            mapTools.nearbySearch(mapCenter.getLng(), mapCenter.getLat(), function (data) {
                if (data) {
                    data.forEach(function (item, i) {
                        $scope.datas.push({
                            name: item.name,
                            addr: item.address,
                            lngLat: item.location.lng + "," + item.location.lat
                        });
                    });
                    $scope.$apply(function () {
                        $scope.datas
                    });
                }
            })
        });
        $scope.selectGEO = function (index) {
            Merchant.localRange = $scope.datas[index].lngLat;
            $rootScope.mapCity = $scope.datas[index].addr;
            $state.go('tab.dash');
        }
    });

    //基本参数
    $scope.inputText = {value: ""};
    $scope.mapPrompt;
    /**
     *  关键字搜索
     */
    $scope.keydown = function () {
        if ($scope.inputText.value == "") {
            $scope.items = [];
            $scope.showhi = false;
            return
        }
        var auto;
        //加载输入提示插件
        $scope.mapObj.plugin(["AMap.Autocomplete"], function () {
            var autoOptions = {
                city: $rootScope.mapCity == undefined ? "" : $rootScope.mapCity //城市，默认全国
            };
            auto = new AMap.Autocomplete(autoOptions);
            //查询成功时返回查询结果
            if ($scope.inputText.value.length > 0) {
                $scope.showhi = true;
                AMap.event.addListener(auto, "complete", function (data) {
                    $scope.autoData = data.tips;
                    $scope.items = [];
                    var resultStr = "";
                    var tipArr = data.tips;
                    if (tipArr && tipArr.length > 0) {
                        for (var i = 0; i < tipArr.length; i++) {
                            if ($scope.inputText.value != "") {
                                $scope.items.push({
                                    index: i,
                                    name: tipArr[i].name,
                                    value: tipArr[i].district
                                });
                            }
                        }
                        $scope.mapPrompt = 0;
                    } else {
                        $scope.items = [];
                        $scope.mapPrompt = 1;
                    }
                    $scope.$apply(function () {
                        $scope.items
                    });
                });
                auto.search($scope.inputText.value);
            }
            else {
                $scope.items = [];
            }
        });

    };

    //选择输入提示关键字
    $scope.clickData = function (index) {
        //截取输入提示的关键字部分
        var text = document.getElementById("divid" + (index + 1)).innerHTML.replace(/<[^>]+>/g, "");
        if (text.indexOf("成都") == -1) {
            $scope.showAlert();
            return
        }
        Merchant.localRange=$scope.autoData[index].location.lng + "," + $scope.autoData[index].location.lat;
        $rootScope.mapCity = $scope.autoData[index].district;
        $state.go('tab.dash');
        $scope.inputText.value = (document.getElementById("divid" + (index + 1)).innerHTML.replace(/<[^>].*?>.*<\/[^>].*?>/g, "")).trim();
        $scope.items = [];
        $scope.showhi = false;
    };


    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            cssClass: 'zan_popup',
            template: '亲!暂时不对成都之外的城市开放.敬请期待!!',
            scope: $scope,
            buttons: []
        });

        $timeout(function () {
            alertPopup.close();
        }, 1000);
    };

    $scope.goAddr = function(){
        if($scope.maplnglat != ""){
            Merchant.localRange=$scope.maplnglat;
            $state.go('tab.dash');
        }
    }
});