/**
 * Created by perfection on 15-8-21.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo_story_mykitchenstory', kitchenInfo_story_myKitchenStory)
    ;


    function kitchenInfo_story_myKitchenStory($scope, $filter, $state,$http,$rootScope) {
        $scope.story = {
            title: "",
            content: ""
        };
        $scope.saveStory = function () {
            $http.post(
                "http://127.0.0.1:8080/user/getMerchantUserInfo", {"id": $rootScope.user.id}, {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                    //if(){}
                });
        }
    }
})();
