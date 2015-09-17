ControllerModule.controller('CommentDetailCtrl', function ($scope, $rootScope, $http, REST_URL, $state, Order, Merchant, $location, $stateParams, $ionicSlideBoxDelegate, $ionicPopup, $timeout, $ionicBackdrop, $ionicActionSheet, $ionicModal, CameraService) {
    $scope.aImages = [];
    $scope.tmpImg = "";
    $scope.formData = {
        star: 1,
        pid: 0,
        is_hide_name: false,
        img_url: []
        //img_url: ["8e6a57b84b087c0e5fe754c0192a3910.jpg", "12dbba0b845a3372ef6510d7fdb3240b.jpg"]
    };

    $scope.back = function () {
        $state.go('order');
    }

    if (!Order.comment.orderNo) {
        $scope.aImages=[];
        $scope.tmpImg = "";
        $scope.formData = {
            star: 1,
            pid: 0,
            is_hide_name: false,
            img_url: []
        }
        popup.alert($ionicPopup, {
            scope: $scope,
            template: '你还没有选择订单！'
        });
        $state.go('order');
    }

    CameraService.createCameraPath($scope, function (result) {
        if (result) {
            if (!result.getType) {
                $scope.tmpImg = [result.pathData];
            } else {
                $scope.tmpImg = result.pathData;
            }
            $scope.upCommentImg();
        }
    });
    $scope.upCommentImg = function () {
        if ($scope.tmpImg instanceof  Array) {
            $scope.tmpImg.forEach(function (item) {
                CameraService.upImg(item, function (res) {
                    var response = res.response;
                    var resObj = eval("(" + response + ")");
                    $scope.aImages.push(resObj.url.replace("/", ""));
                })
            });
            $scope.formData["img_url"] = $scope.aImages;
        } else {
            CameraService.upImg($scope.tmpImg, function (result) {
                var response = result.response;
                var resObj = eval("(" + response + ")");
                $scope.aImages.push(resObj.url.replace("/", ""))
                //alert(result.headers.response.url);
                $scope.formData["img_url"].push(resObj.url.replace("/", ""));
            })
        }
    }

    $scope.comment = function () {
        $scope.formData["user_id"] = Order.comment.buyerId;
        $scope.formData["order_id"] = Order.comment.id;
        $scope.formData["merchant_id"] = Order.comment.sellerId;
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