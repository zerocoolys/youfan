ControllerModule.controller('MessageCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, $ionicPopup, $timeout, $http, HTTP_HEAD) {
    $scope.$root.tabsHidden = "tabs-hide";
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
        url: HTTP_HEAD + "127.0.0.1:8080/notice/getNotice?userId=2",
        dataType: "json"
    }).success(function (dataConfig) {
        $scope.data = [];
        dataConfig.rows.forEach(function (item, i) {
            var dataRes = {};
            dataRes["index"] = i;
            dataRes["id"] = item.id;
            dataRes["context"] = item.data;
            dataRes["des"] = item.des;
            dataRes["userId"] = item.receiverId;
            dataRes["receiver"] = item.receiverPort;
            dataRes["status"] = item.status == 0 ? "未读" : item.status == 1 ? "已读" : "已删除";
            dataRes["title"] = item.title;
            dataRes["code"] = item.code;
            $scope.data.push(dataRes);
        })
    });

    $scope.checkDetail = function (index) {

        if($scope.data[index].status == "未读"){
            $http({
                method: 'GET',
                url: HTTP_HEAD + "127.0.0.1:8080/notice/modifyMsg?id=" + $scope.data[index].id,
                dataType: "json"
            }).success(function (dataConfig) {
                if(dataConfig.rows){
                    $scope.data[index]["status"] = "已读";
                    var alertPopup = $ionicPopup.alert({
                        cssClass: 'zan_popup',
                        template: $scope.data[index].context,
                        scope: $scope,
                        buttons: []
                    });
                    $timeout(function () {
                        alertPopup.close();
                    }, 2000);
                }else{
                    var alertPopup = $ionicPopup.alert({
                        cssClass: 'zan_popup',
                        template: "系统错误",
                        scope: $scope,
                        buttons: []
                    });
                    $timeout(function () {
                        alertPopup.close();
                    }, 2000);
                }
            });
        }

    }

});