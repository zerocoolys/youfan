/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('dishes', dishes);

    function dishes($scope, $filter, $state, $ionicSlideBoxDelegate) {
        $scope.ways = [{name: "配送", id: 0}, {name: "上门", id: 1}, {name: "要做的菜", id: 2}];

        $scope.dishesIndex = 2;
        $scope.activedishes = function (dishesIndex) {
            $scope.dishesIndex = dishesIndex;
            $ionicSlideBoxDelegate.enableSlide([false])

        };

        $scope.slideIndex = 0;
        $scope.activeSlide = function (obj, slideIndex) {
            //$scope.slideIndex = slideIndex;
            obj.slideIndex = slideIndex;
            $ionicSlideBoxDelegate.enableSlide([false]);


        };

        $scope.wayts = [
            /* 配送*/{
                slideIndex: 0,
                states: [{name: "新订单", id: 0, number: 10},
                    {name: "已接单", id: 1, number: 20},
                    {name: "已完成", id: 2, number: 30},
                    {name: "退款中", id: 3, number: 40},
                    {name: "已退款", id: 4, number: 10}],
                dorders: [
                    {
                        /* 新订单*/ orders: [
                        {
                            id: 135268549,
                            img: "http://www.qqzhi.com/uploadpic/2014-12-14/194607145.jpg",
                            state: "待付款",
                            place: "天府软件园",
                            rmb: "￥98.00",
                            time: "2014.11.08 下午13:00"
                        },
                        {
                            id: 135268549,
                            img: "../img/ifzk.jpeg",
                            state: "待付款",
                            place: "天府软件园",
                            rmb: "￥198.00",
                            time: "2014.11.08 下午13:00"
                        }

                    ]
                    },
                    {
                        /* 已接单*/ orders: [
                        {
                            id: 135268549,
                            img: "http://www.touxiang.cn/uploads/20120723/23-033215_282.jpg",
                            state: "待付款",
                            place: "天府软件园",
                            rmb: "￥98.00",
                            time: "2014.11.08 下午13:00"
                        }

                    ]
                    },
                    {
                        /* 已完成*/orders: [
                        {
                            id: 135268549,
                            img: "http://p.3761.com/pic/99731393378256.jpg",
                            state: "待付款",
                            place: "天府软件园",
                            rmb: "￥98.00",
                            time: "2014.11.08 下午13:00"
                        }

                    ]

                    }, {
                        /* 退款中*/orders: [
                            {
                                id: 135268549,
                                img: "http://p3.gexing.com/G1/M00/C0/F7/rBACE1Ojp7iDJJzTAAAWMzSlqR0708_200x200_3.jpg?recache=20131108",
                                state: "待付款",
                                place: "天府软件园",
                                rmb: "￥98.00",
                                time: "2014.11.08 下午13:00"
                            }

                        ]

                    }, {
                        /* 已退款*/orders: [
                            {
                                id: 135268549,
                                img: "http://p.3761.com/pic/99731393378256.jpg",
                                state: "待付款",
                                place: "天府软件园",
                                rmb: "￥98.00",
                                time: "2014.11.08 下午13:00"
                            }

                        ]

                    }]

            },
            /*上门*/{
                slideIndex: 0,
                states: [{name: "新订单", id: 0, number: 10},
                    {name: "已接单", id: 1, number: 20},
                    {name: "已完成", id: 2, number: 30},
                    {name: "退款中", id: 3, number: 40},
                    {name: "已退款", id: 4, number: 10}],
                dorders: [
                    {
                        /* 新订单*/ orders: [
                        {
                            id: 135268549,
                            img: "http://p.3761.com/pic/99731393378256.jpg",
                            state: "待付款",
                            place: "天府软件园",
                            rmb: "￥98.00",
                            time: "2014.11.08 下午13:00"
                        },
                        {
                            id: 135268549,
                            img: "../img/ifzk.jpeg",
                            state: "待付款",
                            place: "天府软件园",
                            rmb: "￥198.00",
                            time: "2014.11.08 下午13:00"
                        }

                    ]
                    },
                    {
                        /* 已接单*/ orders: [
                        {
                            id: 135268549,
                            img: "http://www.touxiang.cn/uploads/20120723/23-033215_282.jpg",
                            state: "待付款",
                            place: "天府软件园",
                            rmb: "￥98.00",
                            time: "2014.11.08 下午13:00"
                        }

                    ]
                    },
                    {
                        /* 已完成*/orders: [
                        {
                            id: 135268549,
                            img: "http://p.3761.com/pic/99731393378256.jpg",
                            state: "待付款",
                            place: "天府软件园",
                            rmb: "￥98.00",
                            time: "2014.11.08 下午13:00"
                        }

                    ]

                    }, {
                        /* 退款中*/orders: [
                            {
                                id: 135268549,
                                img: "http://p3.gexing.com/G1/M00/C0/F7/rBACE1Ojp7iDJJzTAAAWMzSlqR0708_200x200_3.jpg?recache=20131108",
                                state: "待付款",
                                place: "天府软件园",
                                rmb: "￥98.00",
                                time: "2014.11.08 下午13:00"
                            }

                        ]

                    }, {
                        /* 已退款*/orders: [
                            {
                                id: 135268549,
                                img: "http://p.3761.com/pic/99731393378256.jpg",
                                state: "待付款",
                                place: "天府软件园",
                                rmb: "￥98.00",
                                time: "2014.11.08 下午13:00"
                            }

                        ]

                    }]
            },
            /*要做的菜*/{
                dorders: [
                    {
                        orders: [
                            {
                                id: 1352685491111,
                                img: "http://www.touxiang.cn/uploads/20140218/18-074928_617.jpg",
                                state: "待付款",
                                place: "天府软件园",
                                dishnames: "青椒肉丝-回锅肉-大份黄焖鸡",
                                rmb: "￥98.00",
                                time: "2014.11.08 下午13:00"
                            },
                            {
                                id: 135268549,
                                img: "../img/ifzk.jpeg",
                                state: "待付款",
                                place: "天府软件园d903",
                                dishnames: "青椒肉丝-回锅肉-大份黄焖鸡",
                                rmb: "￥198.00",
                                time: "2014.11.08 下午13:00"
                            }

                        ]
                    }
                   ]

        }];


        //$scope.dorders=[1,2,3,4,5];
        //$scope.nimas=[1,2]

    }
})();