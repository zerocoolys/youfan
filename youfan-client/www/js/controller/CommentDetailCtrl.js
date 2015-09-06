ControllerModule.controller('CommentDetailCtrl', function ($scope, $http, REST_URL,Order,Merchant,$location, $stateParams, $ionicSlideBoxDelegate, $ionicPopup, $timeout, $ionicBackdrop, $ionicModal) {
    $scope.formData = {
        star: 1,
        comment_user:'用户1',
        order_id: Order.id,
        pid: 0,
        is_hide_name:false
    };
    $scope.comment = function () {
        console.log($scope.formData);
        $http.post(REST_URL + "/cm/save", $scope.formData).success(function (result) {
            if (result.code === 0) {
                var myPopup = $ionicPopup.show({
                    cssClass: 'zan_popup',
                    template: '评论成功',
                    scope: $scope
                });
                $ionicBackdrop.release();
                $timeout(function () {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 1000);
                $location.path('/order')
            }
        });
    };
    $scope.textAreaChange = function () {
        if ($scope.formData.content.length > 500) {
            $scope.formData.content = $scope.formData.content.substring(0, 500);
        }
    }

    $scope.commentDataList=[];
    $scope.initComment = function () {
        var order_id=2;
        $http.post(REST_URL + "/cm/getComment",{orderId:order_id}).success(function (result) {
            if(result.code===0){
                console.log(result.payload);
            }
        });
    }
    $scope.initComment();
    //$scope.rating_full = {
    //    value: 5
    //};
});