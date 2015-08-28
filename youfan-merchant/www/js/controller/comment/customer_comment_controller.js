(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('customer_comment', CustomerComment);

    function CustomerComment($scope, $filter, $state,$ionicPopup) {



        $scope.statusIndex = 0;
        $scope.data = {};

        $scope.activeStats = function (index) {
            $scope.statusIndex = index;
            $ionicSlideBoxDelegate.slide(index);
        };


        $scope.comments = [
            {img: "img/2.jpeg", userName: 'Tom', content: '好好吃1', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:""},
            {img: "img/2.jpeg", userName: '王小明', content: '好好吃2', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            {img: "img/2.jpeg", userName: '莎莎', content: '好好吃3', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            {img: "img/2.jpeg", userName: '小李', content: '好好吃4', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"},
            {img: "img/2.jpeg", userName: '欧阳赤兔', content: '好好吃5', ctime: "2015-02-03 14:59:03",mtime:"2015-02-03 16:59:03",replyComments:"谢谢"}
        ]

        $scope.replyComments = function() {
            $ionicPopup.show({
                template: '<textarea ng-model="data.comment"> </textarea>',
                title: '评论回复',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
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


        }

    }
})();