ControllerModule.controller('CommentListCtrl', function ($scope, $state, $ionicPopup,$rootScope, Merchant, $http, REST_URL, $stateParams, $ionicSlideBoxDelegate, $ionicModal) {
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.commentData = [];
    if (!Merchant.sellerId) {
        popup.alert($ionicPopup, {
            scope: $scope,
            template: '请选择一个厨房！'
        });
        $state.go('tab.dash');
    }
    $scope.params = {
        pageNo: 1,
        pageSize: 10,
        asc: false,
        sortBy: "ct",
        params:{
            mid:Merchant.sellerId
        }
    }
    $scope.initComment = function () {
        $http.post(REST_URL + "/cm/getCommentPager", $scope.params).success(function (result) {
            if (result.payload.list.length) {
                result.payload.list.forEach(function (item) {
                    item["img"] = "img/2.jpeg";
                    var dateTime = new Date(item["commentTime"]).Format("yyyy-M-d hh:mm:ss");
                    item["commentTime"] = dateTime;
                    item["replay_date"] = item.replay_date ? new Date(item["replay_date"]).Format("yyyy-M-d hh:mm:ss") : '';
                    $scope.comments.push(item)
                });
            }
        });
    }
    $scope.initComment();
    $scope.comments = [
        //{img: "img/2.jpeg", name: 'Record album', content: '味道很好呀，下次还要来吃', time: "2015年2月3日 14:59:03", reply: '谢谢您的评价'},
    ]
    $scope.takeStar = function (star) {
        var html = "";
        for (var i = 0; i < 5; i++) {
            if (star <= i) {
                html += "<i class='ion-ios-star-outline'></i>";
            } else {
                html += "<i class='ion-ios-star'></i>";
            }
        }
        return html;
    }
    $scope.imgStyle = {width: '50px', height: '50px'};
    $scope.aImages = [];
    $ionicModal.fromTemplateUrl('templates/public/image-modal.html', {
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

    $rootScope.goToSlide = function (index, arr) {
        $scope.aImages = arr;
        $scope.modal.show();
        $ionicSlideBoxDelegate.slide(index);
    }
    $rootScope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };
    $scope.imgToggle = function (img) {
        console.log(img);
    }
});