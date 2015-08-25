/**
 * Created by perfection on 15-8-21.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo_story_myhobby', kitchenInfo_story_myHobby)
    ;

    function kitchenInfo_story_myHobby($scope, $filter, $state, $ionicPopup) {
        $scope.text = "";
        $scope.href = "";
        //文本框限制输入字数300
        $scope.checkText = function (text) {
            if (Number(text.length) > 300) {
                alert("限制输入字数300");
                $scope.text = text.substr(0, 300);
            } else {
                $scope.text = text;
            }
        };
        $scope.saveMyStory = function () {
            //保存我的故事到数据库
        };
        $scope.isSaveText = function () {
            if ($scope.href != "") {
                return;
            } else {
                if ($scope.text.length > 0) {

                    var options = {"title": "是否保存当前修改内容"};
                    $ionicPopup.confirm(options)
                        .then(function () {
                            $scope.href = "#/kitcheninfo-story";
                            //这个函数在弹出框关闭时被调用
                        });
                }
            }

        };
    }
})();
