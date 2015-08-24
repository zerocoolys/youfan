// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('youfan.client', ['ionic', 'ConfigModule', 'ControllerModule', 'ServiceModule', 'ngCordova'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.navBar.alignTitle('center');

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/homepage/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            //详情页
            .state('tab.dash-detail', {
                url: '/dash/:dashId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/homepage/dash-detail.html',
                        controller: 'DashDetailCtrl'
                    }
                }
            })
            //首页定位
            .state('tab.change-address', {
                url: '/change-address',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/homepage/change-address.html',
                        controller: 'ChangeAddressCtrl'
                    }
                }
            })
            .state('tab.detail', {
                url: "/detail",
                views: {
                    'tab-dash': {
                        templateUrl: "templates/homepage/shop-detail.html",
                        controller: 'ShopDetailCtrl'
                    }
                }
            })
            //菜品详情
            .state('tab.food-detail', {
                url: "/food-detail",
                views: {
                    'tab-dash': {
                        templateUrl: "templates/homepage/food-detail.html",
                        controller: 'FoodDetailCtrl'
                    }
                }
            })
            //商家详情
            .state('tab.seller-detail', {
                url: "/seller-detail",
                views: {
                    'tab-dash': {
                        templateUrl: "templates/homepage/seller-detail.html",
                        controller: 'SellerDetailCtrl'
                    }
                }
            })

            //评论详情
            .state('tab.comment-detail', {
                url: "/comment-detail",
                views: {
                    'tab-dash': {
                        templateUrl: "templates/homepage/commentlist.html",
                        controller: 'CommentDetailCtrl'
                    }
                }
            })
            //个人中心
            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/personalcenter/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })
            //个人中心-我的关注
            .state('tab.care', {
                url: "/care",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/care.html",
                        controller: 'CareCtrl'
                    }
                }
            })
            //个人中心-我的消息
            .state('tab.message', {
                url: "/message",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/message.html",
                        controller: 'MessageCtrl'
                    }
                }
            })
            //个人中心-我的钱包
            .state('tab.wallet', {
                url: "/wallet",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/wallet.html",
                        controller: 'WalletCtrl'
                    }
                }
            })
//            钱包中的优惠券
            .state('tab.coupons', {
                url: "/coupons",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/coupons.html",
                        controller: 'CouponsCtrl'
                    }
                }
            })
//            推荐奖励
            .state('tab.recommended-awards', {
                url: "/recommended-awards",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/recommended-awards.html"
                    }
                }
            })
            //个人中心-我的订单
            .state('tab.order', {
                url: "/order",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/order.html",
                        controller: 'MyOrderCtrl'
                    }
                }
            })
            //个人中心-我的订单-订单详情
            .state('tab.order-detail', {
                url: "/order-detail",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/order-detail.html",
                        controller: 'OrderDetailCtrl'
                    }
                }
            })
            //个人中心-我的订单-订单详情-支付成功
            .state('tab.pay-success', {
                url: "/pay-success",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/pay-success.html"
//                        controller: 'PaySuccessCtr'
                    }
                }
            })
            //个人中心-个人信息
            .state('tab.personal-info', {
                url: "/personal-info",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/personal-info.html",
                        controller: 'PersonalInfoCtrl'
                    }
                }
            })
            //个人中心-送餐地址
            .state('tab.address', {
                url: "/address",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/address.html",
                        controller: 'AddressCtrl'
                    }
                }
            })
            //个人中心-添加送餐地址
            .state('tab.add-address', {
                url: "/add-address",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/add-address.html",
                        controller: 'AddressCtrl'
                    }
                }
            })
            //个人中心-设置
            .state('tab.set', {
                url: "/set",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/set.html",
                        controller: 'SetCtrl'
                    }
                }
            })
            //密码登陆
            .state('tab.login', {
                url: '/login',
                views: {
                    'tab-login': {
                        templateUrl: 'templates/tab-pwdlogin.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            //短信验证码登陆
            .state('tab.verifylogin', {
                url: '/verifylogin',
                views: {
                    'tab-login': {
                        templateUrl: 'templates/tab-verifylogin.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
//            确认订单页
            .state('tab.confirm-order', {
                url: '/confirm-order/:orderId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/confirm-order.html',
                        controller: 'ConfirmOrderCtrl'
                    }
                }
            })
//            支付页面
            .state('tab.pay-page', {
                url: '/pay-page',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/pay-page.html'
//                        controller: 'DashDetailCtr'
                    }
                }
            })
//            就餐方式页
            .state('tab.dining-way', {
                url: '/dining-way',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/dining-way.html',
                        controller: 'DiningWayCtrl'
                    }
                }
            })
            // 发现
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/find/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.Map', {
                url: '/mapCtrl',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/homepage/map.html',
                        controller: 'MapContainer'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    })
    .directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $el) {
                $rootScope.hideTabs = true;
                $scope.$on('$destroy', function () {
                    $rootScope.hideTabs = false;
                });
            }
        };
    })
    //图标点击
    .directive('iconSwitcher', function ($ionicBackdrop, $ionicPopup, $timeout) {
        return {
            link: function (scope, elem, attrs) {
                var currentState = true;
                elem.on('click', function () {
                    if (currentState === true) {
                        angular.element(elem).removeClass(attrs.onIcon);
                        angular.element(elem).addClass(attrs.offIcon);
                        scope.$apply(function () {
                            var myPopup = $ionicPopup.show({
                                cssClass: 'zan_popup',
                                template: attrs.popupsure,
                                scope: scope
                            });
                            $ionicBackdrop.release();
                            $timeout(function () {
                                myPopup.close();
                            }, 1000);
                        });

                    } else {
                        angular.element(elem).removeClass(attrs.offIcon);
                        angular.element(elem).addClass(attrs.onIcon);
                        scope.$apply(function () {
                            var myPopup = $ionicPopup.show({
                                cssClass: 'zan_popup',
                                template: attrs.popupcancel,
                                scope: scope
                            });
                            $ionicBackdrop.release();
                            $timeout(function () {
                                myPopup.close();
                            }, 1000);
                        });

                    }

                    currentState = !currentState

                })
            }
        }
    })
