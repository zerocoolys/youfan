ControllerModule.controller('CommentDetailCtrl', function ($scope, $rootScope, $http, REST_URL, $state, Order, Merchant, $location, $stateParams, $ionicSlideBoxDelegate, $ionicPopup, $timeout, $ionicBackdrop, $ionicActionSheet, $ionicModal, CameraService) {
    $scope.back = function () {
        $state.go('tab.order');
    }
    if (Order.comment.orderNo) {
        console.log(Order.comment);
    } else {
        popup.alert($ionicPopup, {
            scope: $scope,
            template: '你还没有选择订单！'
        });
        $state.go('tab.order');
    }
    $scope.cImg = "";
    CameraService.createCameraPath($scope, function (result) {
        if (result) {
            if (!result.getType) {
                $scope.cImg = result.pathData;
            } else {
                $scope.cImg = result.pathData[0];
            }
        }
    });
    $scope.upCommentImg = function () {
        if ($scope.cImg instanceof  Array) {
            alert("我选了多张！")
        }
        CameraService.upImg($scope.cImg, function (result) {
            alert(JSON.stringify(result));
        });
    }
    $scope.formData = {
        star: 1,
        pid: 0,
        is_hide_name: false,
        img_url: ["8e6a57b84b087c0e5fe754c0192a3910.jpg", "12dbba0b845a3372ef6510d7fdb3240b.jpg"],
        //img_url: ["8e6a57b84b087c0e5fe754c0192a3910.jpg", "12dbba0b845a3372ef6510d7fdb3240b.jpg"]
    };
    $scope.comment = function () {
        $scope.formData["comment_user"] = Order.comment.buyerId;
        $scope.formData["order_id"] = Order.comment.id;
        $scope.formData["sellerId"] = Order.comment.sellerId;
        if (!$scope.formData.content) {
            popup.alert($ionicPopup, {
                scope: $scope,
                template: '亲，还是说两句话吧！'
            });
            return;
        }
        $http.post(REST_URL + "/cm/save", $scope.formData).success(function (result) {
            if (result.code === 0) {
                popup.alert($ionicPopup, {
                    scope: $scope,
                    template: '评论成功！'
                }, function () {
                    $scope.back();
                });
            }
        });
    };
    $scope.textAreaChange = function () {
        if ($scope.formData.content.length > 500) {
            $scope.formData.content = $scope.formData.content.substring(0, 500);
        }
    }

    $scope.commentDataList = [];
    $scope.commentDataList = [];
    $scope.aImages = [{
        'src': 'img/1.jpg'
    }, {
        'src': 'img/2.jpeg'
    }, {
        'src': 'img/1.jpg'
    }];

    $ionicModal.fromTemplateUrl('image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $rootScope.openModal = function () {
        $ionicSlideBoxDelegate.slide(0);
        $scope.modal.show();
    };

    $rootScope.closeModal = function () {
        $scope.modal.hide();
    };
    $rootScope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    $rootScope.next = function () {
        $ionicSlideBoxDelegate.next();
    };

    $rootScope.previous = function () {
        $ionicSlideBoxDelegate.previous();
    };

    $rootScope.goToSlide = function (index) {
        $scope.modal.show();
        $ionicSlideBoxDelegate.slide(index);
    }
    $rootScope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };
});