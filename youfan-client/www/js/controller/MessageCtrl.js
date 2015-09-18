ControllerModule.controller('MessageCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, User, $ionicPopup, $timeout, $http, REST_URL, $ionicModal) {
    $scope.flagPing = false;
    $scope.flagMsg = true;
    $scope.slideIndex = 0;
    // Called each time the slide changes
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };

    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };
    $scope.message = function (index) {
        $http({
            method: 'GET',
            url: REST_URL + "/notice/getNotice/" + User.id,
            dataType: "json"
        }).success(function (dataConfig) {
            $scope.data = [];
            console.log(dataConfig)
            if (dataConfig.code == 0) {
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
    };

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
    };
    $scope.deleteItem = function (item) {
        $scope.data.splice($scope.data.indexOf(item), 1);
        $http({method: 'GET', url: REST_URL + "/notice/delMsg/" + item.id, dataType: "json"})
    };


    $scope.comment = function (index) {
        $scope.commArray = [];
        var per = {params: {uid: User.id, replayed: true}};
        $http.post(REST_URL + "/cm/getCommentPager", per).success(function (result) {
            if (result.payload.list.length > 0) {
                result.payload.list.forEach(function (item, i) {
                    item["commentTime"] = new Date(item.commentTime).Format("yyyy-MM-dd hh:mm:ss");
                    item["replay_date"] = new Date(item.replay_date).Format("yyyy-MM-dd hh:mm:ss");
                    $scope.commArray.push(item)
                });
            }
        });

    }
});