ControllerModule.controller('CommentListCtrl', function ($scope, $http, REST_URL, $stateParams, $ionicSlideBoxDelegate) {
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.commentData = [];
    $scope.initComment = function () {
        $http.get(REST_URL + "/cm/getCommentPager?pageNo=1&pageSize=10&asc=true&sortBy=ct").success(function (result) {
            if (result.payload.rows.length) {
                result.payload.rows.forEach(function (item) {
                    item["img"] = "img/2.jpeg";
                    var dateTime = new Date(item["commentTime"]);
                    item["commentTime"] = dateTime.toLocaleDateString() + "  " + dateTime.toLocaleTimeString();
                    $scope.comments.push(item)
                })
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
});