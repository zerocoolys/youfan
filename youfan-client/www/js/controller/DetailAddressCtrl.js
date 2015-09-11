/**
 * Created by subdong on 15-9-7.
 */
ControllerModule.controller('DetailAddressCtrl', function ($scope, $http, REST_URL, Merchant, $state, $ionicModal, $rootScope) {
    //加载地图，调用浏览器定位服务
    $scope.mapObj = new AMap.Map('mapContainer', {
        resizeEnable: true,
        view: new AMap.View2D({
            zoom: 16 //地图显示的缩放级别
        })
    });
    mapTools.getUserLngLat($scope.mapObj, function (item) {
        $scope.marker = new AMap.Marker({
            icon: "http://webapi.amap.com/images/marker_sprite.png",
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
                    })
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
                    })
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
});