ControllerModule.controller('CommentDetailCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, $ionicPopup, $timeout, $ionicBackdrop,$ionicModal) {
    $scope.comment = function () {
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
    };
});