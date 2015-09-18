/**
 * Created by ss on 2015/8/19.
 */
ControllerModule.controller('WalletCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, localStorageService, $http, REST_URL) {
    $http({
        method: 'GET',
        url: REST_URL + "/notice/getNotice/" + localStorageService.get("userid"),
        dataType: "json"
    }).success(function (dataConfig) {
        $scope.data = [];
        if (dataConfig.code == 1) {
            dataConfig.payload.forEach(function (item, i) {
                var dataRes = {};
                dataRes["index"] = i;
                dataRes["id"] = item.id;
                dataRes["context"] = item.data;
                dataRes["des"] = item.des;
                dataRes["userId"] = item.receiverId;
                dataRes["receiver"] = item.receiverPort;
                dataRes["status"] = item.status;
                dataRes["title"] = item.title;
                dataRes["code"] = item.code;
                dataRes["date"] = new Date(item.date).Format("yyyy-MM-dd hh:mm:ss");
                $scope.data.push(dataRes);
            })
        }
    });
});