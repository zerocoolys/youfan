/**
 * Created by subdong on 15-8-21.
 *
 * 服务类型
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
    },
    /**
     * 计算两个经纬度之间的 步行地理距离
     * @param start 参数类型 AMap.LngLat
     * @param end   参数类型 AMap.LngLat
     * @param cb    回调函数 返回数据单位 米
     */
    getDistance: function (start, end, cb) {
        AMap.service(["AMap.Walking"], function () {
            var walking = new AMap.Walking();
            walking.search(start, end, function (status, result) {
                if (status === 'complete' && result.info === 'ok') {
                    cb(result.count > 0 ? result.routes[0].distance : "计算错误请重试");
                } else {
                    cb(false)
                }
            })
        });
    },
    /**
     * 获取传入坐标的详细地址
     * @param lnglatXY  参数类型 AMap.LngLat
     * @param cb        回调函数
     */
    geocoder: function (lnglatXY, cb) {
        var MGeocoder;
        AMap.service(["AMap.Geocoder"], function () {
            MGeocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            //逆地理编码
            MGeocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    cb(result.regeocode.formattedAddress);
                } else {
                    cb(false);
                }
            });
        });
    },
    /**
     * 通过坐标获取周边信息
     * @param lnglatXY  中心坐标   //参数类型 AMap.LngLat
     * @param cb        回调函数
     * @param mapObj    地图初始话参数
     */
    nearbySearch: function (lng, lat, cb) {
        var cpoint = new AMap.LngLat(lng,lat);
        AMap.service(["AMap.PlaceSearch"], function () {
            var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                pageSize: 20,
                pageIndex: 1
            });
            placeSearch.searchNearBy('', cpoint, 3000, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    cb(result.poiList.pois)
                } else {
                    cb(false);
                }

            });
        })
    }
};
