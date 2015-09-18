/**
 * Created by ss on 2015/8/19.
 */
ControllerModule.controller('CouponsCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, User, $http, REST_URL) {
    $scope.isShowFooterBar = false;

    $http({
        method: 'GET',
        url: REST_URL + "/coupon/getCouponInfo/" + User.id
    }).success(function (dataConfig) {
        $scope.dataArray = [];
        if (dataConfig.code == 1) {
            dataConfig.payload.forEach(function(item,i){
                var data={
                    id:item.id, //优惠卷id
                    title_type:item.title.split("|")[0],
                    title_msg:item.title.split("|")[1],
                    datatime:new Date(item.validityTime).Format("yyyy-MM-dd hh:mm:ss"),
                    cpstypeid:item.couponsTypeId //优惠卷类型id
                };
                $scope.dataArray.push(data);
            });
        }
        console.log(dataConfig.payload)
    });
});