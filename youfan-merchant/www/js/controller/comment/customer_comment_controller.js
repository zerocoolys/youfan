(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('customer_comment', CustomerComment);

    function CustomerComment($rootScope, $scope, $http, REST_URL, $filter, $state, $ionicPopup, $ionicModal, $ionicSlideBoxDelegate) {


        $scope.statusIndex = 0;
        $scope.data = {};

        $scope.activeStats = function (index) {
            $scope.statusIndex = index;
            $ionicSlideBoxDelegate.slide(index);
        };


        $scope.comments = [
            //
            ////{img: "img/ifzk.jpeg", userName: 'Tom', content: '感觉阳光世纪这家要比大融城好啊！！！人也较少，服务员特别好，味道也不差。而且又有团购。不晓得为啥大家不走过来吃。 第一次吃黄记煌是五年前在深圳，同学说是深圳特产特意请我尝尝，貌似在海港城那家，哈哈，几年后重庆也有了。', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:""},
            ////{img: "img/ionic.png", userName: '王小明', content: '好好吃2', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            ////{img: "img/1.jpeg", userName: '莎莎', content: '好好吃3', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            ////{img: "img/ifzk.jpeg", userName: '小李', content: '好好吃4', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            ////{img: "img/1.jpeg", userName: '欧阳赤兔', content: '好好吃5', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"}
            //
            //{img: "img/ifzk.jpeg", userName: 'Tom', content: '感觉阳光世纪这家要比大融城好啊！！！人也较少，服务员特别好，味道也不差。而且又有团购。不晓得为啥大家不走过来吃。 第一次吃黄记煌是五年前在深圳，同学说是深圳特产特意请我尝尝，貌似在海港城那家，哈哈，几年后重庆也有了。', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:""},
            //{img: "img/ionic.png", userName: '王小明', content: '好好吃2', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            //{img: "img/1.jpeg", userName: '莎莎', content: '好好吃3', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:""},
            //{img: "img/ifzk.jpeg", userName: '小李', content: '好好吃4', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            //{img: "img/1.jpeg", userName: '欧阳赤兔', content: '好好吃5', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:""}

        ];
        $scope.params = {
            pageNo: 1,
            pageSize: 10,
            asc: false,
            sortBy: "ct"
        };
        $scope.initComment = function () {
            $http.post(REST_URL + "/cm/getCommentPager", $scope.params).success(function (result) {
                if (result.payload.list.length) {
                    result.payload.list.forEach(function (item) {
                        item["img"] = "img/2.jpeg";
                        var dateTime = new Date(item["commentTime"]);
                        item["commentTime"] = dateTime.toLocaleDateString() + "  " + dateTime.toLocaleTimeString();
                        item["replay_date"]=item.replay_date?new Date(item["replay_date"]).toLocaleDateString()+" "+new Date(item["replay_date"]).toLocaleTimeString():'';
                        $scope.comments.push(item)
                    });
                }
            });
        }
        $scope.initComment();

        $scope.replyComments = function (cid) {
            $ionicPopup.show({
                template: '<textarea ng-model="data.comment"> </textarea>',
                title: '评论回复',
                scope: $scope,
                buttons: [
                    {text: '返回'},
                    {
                        text: '<span class="  ">确认回复</span>',
                        type: 'button-calm',
                        onTap: function (e) {
                            if ($scope.data.comment && cid) {
                                $http.get(REST_URL + "/cm/replayComment?cid=" + cid + "&content=" + $scope.data.comment).success(function (result) {
                                    if (result.code == 200) {
                                        $scope.initComment();
                                        e.preventDefault();
                                    }
                                });
                            }

                            if (!$scope.data.comment) {
                                e.preventDefault();
                            } else {
                                return $scope.data.comment;
                            }
                        }
                    },
                ]
            });
        };

        $scope.takeStar = function (star) {
            var html = "";
            for (var i = 0; i < 5; i++) {
                if (star <= i) {
                    html += "<i class='ion-ios-star-outline'></i>";
                } else {
                    html += "<i class='ion-ios-star calm'></i>";
                }
            }
            return html;
        }

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

        $scope.goToSlide = function (index,arr) {
            $scope.aImages=arr;
            $scope.modal.show();
            $ionicSlideBoxDelegate.slide(index);
        }

        $rootScope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };
        $scope.dishesimgs = ['../../img/2 (1).jpg', '../../img/2 (2).jpg', '../../img/2 (3).jpg', '../../img/2 (4).jpg'];

    }
})();
