ControllerModule.controller('MapContainer', function ($scope, $stateParams, $cordovaGeolocation) {
    $scope.geolocation;
    $scope.mapObj;
    $scope.lg = {
        x: 104.065735,
        y: 30.657425
    }
    $scope.initMapLg = function () {
        var lg = $stateParams.lg;
        if (lg) {
            if (lg.indexOf(",")) {
                $scope.lg.x = parseFloat(lg.split(",")[0]);
                $scope.lg.y = parseFloat(lg.split(",")[1]);
            }
        }
    }
    $scope.initMapLg();
    //加载地图，调用浏览器定位服务
    $scope.mapObj = new AMap.Map('mapContainer', {
        resizeEnable: true,
        view: new AMap.View2D({
            center: new AMap.LngLat($scope.lg.x, $scope.lg.y),//地图中心点
            zoom: 16 //地图显示的缩放级别
        })
    });
    dataXY = [{x: $scope.lg.x, y: $scope.lg.y}];
    mapApiUtils.setMarker(dataXY, $scope.mapObj);
    //比例工具尺定位
    mapApiUtils.toolBar($scope.mapObj);
    $scope.mapObj.plugin('AMap.Geolocation', function () {
        $scope.geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 300000,      //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonDom: "<img src='img/marker.png' width='30' height='30'/>",
            buttonPosition: 'RT',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        //$scope.mapObj.addControl($scope.geolocation);
        $scope.geocoder = "正在加载商家详细地址...";
        //返回定位成功处理
        AMap.event.addListener($scope.geolocation, 'complete', function (data) {
            var lnglatXY = new AMap.LngLat(data.position.getLng(), data.position.getLat());
            var a = new AMap.LngLat($scope.lg.x, $scope.lg.y);
            //获取详细地址
            mapTools.geocoder(a, function (data) {
                $scope.$apply(function () {
                    $scope.geocoder = data;
                })
            });
            //通过经纬度计算地理距离
            mapTools.getDistance(lnglatXY, a, function (data) {
                data = data / 1000 >= 1 ? data / 1000 + "公里" : data + "米";
                $scope.$apply(function () {
                    $scope.distance = data
                })
            })


        });
        //返回定位出错信息处理
        AMap.event.addListener($scope.geolocation, 'error', function () {
            alert("定位失败!请检查是否给予app定位权限!!")
        });
    });

    $scope.mapObj.plugin('AMap.Geolocation', function () {
        $scope.locateIsGo = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 300000,      //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonDom: "<img src='img/marker.png' width='30' height='30'/>",
            buttonPosition: 'RT',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        $scope.mapObj.addControl($scope.locateIsGo);
    });
    $scope.geolocation.getCurrentPosition();


});