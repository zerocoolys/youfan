/**
 * Created by subdong on 15-8-21.
 */
var mapTools = {
    /**
     * 地图城市定位,并返回城市名称
     * 返回名称调用请直接调用  $scope.mapCity
     * 参数 mapObj 为地图初始化参数
     */
    cityLocation: function ($scope, $rootScope, mapObj) {
        mapObj.plugin('AMap.Geolocation', function () {
            $scope.geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 300000           //定位结果缓存0毫秒，默认：0
            });
            mapObj.addControl($scope.geolocation);
            //返回定位成功处理
            AMap.event.addListener($scope.geolocation, 'complete', function (data) {
                var lnglatXY = new AMap.LngLat(data.position.getLng(), data.position.getLat()), MGeocoder;
                AMap.service(["AMap.Geocoder"], function () {
                    MGeocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    //逆地理编码
                    MGeocoder.getAddress(lnglatXY, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            $scope.$apply(function () {
                                $scope.mapCity = result.regeocode.addressComponent.city;
                            });
                        } else {
                            alert("获取失败");
                        }
                    });
                });
            });
            //返回定位出错信息处理
            AMap.event.addListener($scope.geolocation, 'error', function () {
                alert("定位失败!请检查是否给予app定位权限!!")
            });
        });
        $scope.geolocation.getCurrentPosition();
    },
    /**
     * 地图城市定位,并返回用户所在详细地址
     * 返回名称调用请直接调用  $scope.mapAddr
     * 参数 mapObj 为地图初始化参数
     */
    cityLocationAddr: function ($scope, $rootScope, mapObj) {
        mapObj.plugin('AMap.Geolocation', function () {
            $scope.geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 300000           //定位结果缓存0毫秒，默认：0
            });
            mapObj.addControl($scope.geolocation);
            //返回定位成功处理
            AMap.event.addListener($scope.geolocation, 'complete', function (data) {
                var lnglatXY = new AMap.LngLat(data.position.getLng(), data.position.getLat()), MGeocoder;
                AMap.service(["AMap.Geocoder"], function () {
                    MGeocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    //逆地理编码
                    MGeocoder.getAddress(lnglatXY, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            $scope.$apply(function () {
                                $scope.mapAddr = result.regeocode.formattedAddress;
                            });
                        } else {
                            alert("获取失败");
                        }
                    });
                });
            });
            //返回定位出错信息处理
            AMap.event.addListener($scope.geolocation, 'error', function () {
                alert("定位失败!请检查是否给予app定位权限!!")
            });
        });
        $scope.geolocation.getCurrentPosition();
    }
};
