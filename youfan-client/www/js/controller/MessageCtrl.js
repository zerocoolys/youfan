ControllerModule.controller('MessageCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, $ionicPopup, $timeout, $http, REST_URL, $ionicModal) {
    $scope.slideIndex = 0;
    // Called each time the slide changes
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    }

    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };

    $http({
        method: 'GET',
        url: REST_URL + "/notice/getNotice/2",
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

    $scope.checkDetail = function (index) {

        if ($scope.data[index].status == 0) {
            $http({
                method: 'GET',
                url: REST_URL + "/notice/modifyMsg/" + $scope.data[index].id,
                dataType: "json"
            }).success(function (dataConfig) {
                if (dataConfig.payload) {
                    $scope.data[index]["status"] = 1;

                } else {
                    var alertPopup = $ionicPopup.alert({
                        cssClass: 'zan_popup',
                        template: "系统错误",
                        scope: $scope,
                        buttons: []
                    });
                    $ionicBackdrop.release();
                    $timeout(function () {
                        alertPopup.close();
                    }, 2000);
                }
            });
        }
    }
    $scope.deleteItem = function (item) {
        $scope.data.splice($scope.data.indexOf(item), 1);
    };

});