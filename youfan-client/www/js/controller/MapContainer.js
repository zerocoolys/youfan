ControllerModule.controller('MapContainer', function ($scope, $stateParams, $cordovaGeolocation) {
    $scope.geolocation;
    $scope.mapObj;

    //加载地图，调用浏览器定位服务
    $scope.mapObj = new AMap.Map('mapContainer', {
        resizeEnable: true
    });

    //比例工具尺定位
    mapApiUtils.toolBar($scope.mapObj);

    $scope.mapObj.plugin('AMap.Geolocation', function () {
        $scope.geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 300000,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonDom:"<img src='http://image.chinawriter.com.cn/cr/2013/0425/3873279506.jpg' width='30' height='30'/>",
            buttonPosition: 'RT',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: 3000,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        $scope.mapObj.addControl($scope.geolocation);
        //返回定位成功处理
        AMap.event.addListener($scope.geolocation, 'complete', function (data){
            var lnglatXY = new AMap.LngLat(data.position.getLng(),data.position.getLat());
            alert(1);
            $scope.geocoder(lnglatXY);
            dataXY = [
                {x:104.073588,y:30.537481},
                {x:104.075101,y:30.540535},
                {x:104.071142,y:30.538885},
                {x:104.074007,y:30.540488}
            ];
            mapApiUtils.setMarker(dataXY,$scope.mapObj)
        });
        //返回定位出错信息处理
        AMap.event.addListener($scope.geolocation, 'error', function () {
            alert("定位失败!请检查是否给予app定位权限!!")
        });
    });

    //获取该坐标的详细地址
    $scope.geocoder=function (lnglatXY) {
        var MGeocoder,address;
        AMap.service(["AMap.Geocoder"], function () {
            MGeocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            //逆地理编码
            MGeocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    alert(result.regeocode.formattedAddress);
                }else{
                    alert("获取失败");
                }
            });
        });
    }

    $scope.geolocation.getCurrentPosition();

});