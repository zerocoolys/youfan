// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('youfan.client', ['ionic', 'ConfigModule', 'ControllerModule', 'ServiceModule', 'ngCordova', 'LocalStorageModule'])
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

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, localStorageServiceProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.navBar.alignTitle('center');
        localStorageServiceProvider.setPrefix('youfan');
        localStorageServiceProvider.setStorageType('sessionStorage');
        localStorageServiceProvider.setStorageCookie(45, 'tab.chats');
        localStorageServiceProvider.setStorageCookieDomain('');
        localStorageServiceProvider.setNotify(true, true);

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
                cache: false,
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/homepage/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            //详情页
            .state('tab.dash-detail', {
                url: '/dash/:merchantId',
                cache: false,
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
                cache: false,
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
                        controller: 'CommentListCtrl'
                    }
                }
            })
            //个人中心
            .state('tab.chats', {
                url: '/chats',
                cache: false,
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
                url: "/order-detail/:detailId",
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
            .state('tab.pwd-login', {
                url: '/pwd-login',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/login/pwd-login.html',
                        controller: 'PwdLoginCtrl'
                    }
                }
            })
            //注册
            .state('tab.user-register', {
                url: '/user-register',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/login/user-register.html',
                        controller: 'UserRegisterCtrl'
                    }
                }
            })
            //重置密码--获取验证码
            .state('tab.reset-pwd-one', {
                url: '/reset-pwd-one',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/login/reset-pwd-one.html',
                        controller: 'ResetPwdOneCtrl'
                    }
                }
            })
            //重置密码--重置密码
            .state('tab.reset-pwd-two', {
                url: '/reset-pwd-two',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/login/reset-pwd-two.html',
                        controller: 'ResetPwdTwoCtrl'
                    }
                }
            })
            //设置密码
            .state('tab.set-pwd', {
                url: '/set-pwd',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/login/set-pwd.html',
                        controller: 'SetPwdCtrl'
                    }
                }
            })
            //免责协议
            .state('tab.user-agreement', {
                url: '/user-agreement',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/user-agreement.html'
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
                url: '/pay-page/:order_no/:discountPrice',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/pay-page.html',
                        controller: 'OrderPayCtrl'
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
                url: '/mapCtrl/:lg',
                cache:false,
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/homepage/map.html',
                        controller: 'MapContainer'
                    }
                }
            })
            .state('tab.comment-details', {
                url: '/comment-details',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/homepage/comment-detail.html',
                        controller: 'CommentDetailCtrl'
                    }
                }
            })
            .state('tab.detail-address', {
                url: '/detail-address',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/homepage/detail-address.html',
                        controller: 'DetailAddressCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    })
    .directive('hideTabs', function ($rootScope, $location, $state) {
        return {
            restrict: 'A',
            link: function ($scope, $el) {
                $scope.$on('$stateChangeSuccess', function () {
                    if ($state.current.name == "tab.dash" || $state.current.name == "tab.chats" || $state.current.name == "tab.account") {
                        $rootScope.hideTabs = false;
                    } else {
                        $rootScope.hideTabs = true;
                    }
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

    });
