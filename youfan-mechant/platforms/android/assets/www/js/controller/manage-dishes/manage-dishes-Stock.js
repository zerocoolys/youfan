/**
 * Created by Fzk lwek on 2015/8/24.
 */
/**
 * Created by Fzk lwek on 2015/8/20.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('manage_dishes_Stock', manage_dishes_Stock);

    function manage_dishes_Stock($scope, $filter, $state, $ionicActionSheet, $ionicSlideBoxDelegate) {
        $scope.activeSlide = function (index) {
            $scope.slideIndex = index;
            $ionicSlideBoxDelegate.enableSlide([false]);
        };
        $scope.slideIndex = 0;
        $scope.ways=[
          /*今日库存*/  {
                dishes:[ {name:"回锅肉", amount:"20"}],
                tables:[{name:"三人桌", amount:"20"}],
                others:[{name:"回锅肉", amount:"20"}]


            },/*每日固定库存*/{
                dishes:[ {name:"回锅肉", amount:"20"}],
                tables:[{name:"三人桌", amount:"20"}],
                others:[{name:"回锅肉", amount:"20"}]
            }
        ]




    }
})();