/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('dishes', dishes);

    function dishes($scope, $filter, $state,$ionicSlideBoxDelegate) {
        $scope.ways=[ { name:"配送", id:0}, { name:"上门",id:1 }, {name:"要做的菜",id:2 }];
        $scope.states=[{ name:"配送", id:0, number:10 },
                       { name:"已接单",   id:1,  number:20  },
                       { name:"已完成", id:2, number:30},
                       {name:"退款中", id:3,number:40 },
                       { name:"已退款",  id:4, number:10 }
        ];
        $scope.orders=[
            {   id:135268549,
                img:"../img/ifzk.jpeg",
                state:"待付款",
                place:"河马堂药膳厨房",
                rmb:"￥98.00",
                time:"2014.11.08 下午13:00"
            },
            {   id:135268549,
                img:"../img/ifzk.jpeg",
                state:"待付款",
                place:"河马堂药膳厨房",
                rmb:"￥198.00",
                time:"2014.11.08 下午13:00"
            }

        ];
        $scope.dishesIndex=0;
        $scope.activedishes = function (dishesIndex) {
            $scope.dishesIndex = dishesIndex;
            $ionicSlideBoxDelegate.enableSlide([false])

        };

        $scope.slideIndex=0;
        $scope.activeSlide = function (slideIndex) {
            $scope.slideIndex = slideIndex;
            $ionicSlideBoxDelegate.enableSlide([false])


        };




        $scope.dorders=[1,2,3,4,5];
       $scope.nimas=[1,2]

    }
})();