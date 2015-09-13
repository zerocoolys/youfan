(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('customer_comment', CustomerComment);

    function CustomerComment($scope, $filter, $state,$ionicPopup,$ionicSlideBoxDelegate) {



        $scope.statusIndex = 0;
        $scope.data = {};

        $scope.activeStats = function (index) {
            $scope.statusIndex = index;
            $ionicSlideBoxDelegate.slide(index);
        };


        $scope.comments = [
            {img: "img/ifzk.jpeg", userName: 'Tom', content: '感觉阳光世纪这家要比大融城好啊！！！人也较少，服务员特别好，味道也不差。而且又有团购。不晓得为啥大家不走过来吃。 第一次吃黄记煌是五年前在深圳，同学说是深圳特产特意请我尝尝，貌似在海港城那家，哈哈，几年后重庆也有了。', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:""},
            {img: "img/ionic.png", userName: '王小明', content: '好好吃2', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            {img: "img/1.jpeg", userName: '莎莎', content: '好好吃3', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            {img: "img/ifzk.jpeg", userName: '小李', content: '好好吃4', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            {img: "img/1.jpeg", userName: '欧阳赤兔', content: '好好吃5', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"}
        ]

        $scope.replyComments = function() {
            $ionicPopup.show({
                template: '<textarea ng-model="data.comment"> </textarea>',
                title: '评论回复',
                scope: $scope,
                buttons: [
                    { text: '返回' },
                    {
                        text: '<span class="  ">确认回复</span>',
                        type: 'button-calm',
                        onTap: function(e) {
                            console.log($scope.comments);
                            $scope.comments[0].replyComments  = $scope.data.comment;

                            console.log($scope.comments);


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
        $scope.dishesimgs=['../../img/2 (1).jpg','../../img/2 (2).jpg','../../img/2 (3).jpg','../../img/2 (4).jpg'];

    }
})();
